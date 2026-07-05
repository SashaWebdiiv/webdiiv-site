"use client";

import { useEffect } from "react";

/**
 * Tracking Cal.com → dataLayer (lu par GTM, qui pousse vers GA4).
 *
 * Événements poussés :
 *  - `cal_open`      : clic sur un CTA qui ouvre Cal.com (bouton flottant
 *                      « On commence ? » ou bouton avec data-cal-link).
 *                      `offre` = paramètre ?offre= du lien si présent.
 *  - `generate_lead` : réservation Cal.com menée au bout (bookingSuccessful).
 *
 * L'abandon (ouvert mais pas réservé) = `cal_open` sans `generate_lead`,
 * reconstitué côté GA4 en entonnoir.
 */
export default function Analytics() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    const push = (obj) => window.dataLayer.push(obj);

    // --- cal_open : délégation de clic sur les déclencheurs Cal.com ---
    const onClick = (e) => {
      const trigger = e.target.closest?.("[data-cal-link], cal-floating-button");
      if (!trigger) return;

      let offre = null;
      const href = trigger.getAttribute?.("href");
      if (href) {
        try {
          offre = new URL(href, window.location.origin).searchParams.get("offre");
        } catch {}
      }
      const isFloating = trigger.tagName?.toLowerCase() === "cal-floating-button";
      const source = isFloating ? "floating" : "inline";

      push({ event: "cal_open", cal_source: source, offre: offre || undefined });

      // Le bouton flottant gère son propre modal → on ne fait que tracker.
      if (isFloating) return;

      // Liens inline (`[data-cal-link]`) : ils portent un `href` de repli, donc
      // on bloque toujours la navigation (jamais de "refresh").
      const calLink = trigger.getAttribute?.("data-cal-link");
      if (!calLink) return;
      e.preventDefault();

      const ns = window.Cal?.ns?.[trigger.getAttribute?.("data-cal-namespace") || "30min"];
      // Cal pas encore prêt → on laisse l'événement remonter (au cas où l'embed
      // Cal l'attrape), sans ouvrir nous-mêmes (évite un double modal).
      if (!ns) return;

      // Cal prêt : on ouvre le modal nous-mêmes ET on stoppe la propagation en
      // capture pour empêcher le handler bubble de l'embed d'en ouvrir un 2e
      // (double modal → double lock `overflow:hidden`, scroll bloqué).
      e.stopImmediatePropagation();
      let config = { layout: "month_view" };
      try {
        const raw = trigger.getAttribute?.("data-cal-config");
        if (raw) config = JSON.parse(raw);
      } catch {}
      ns("modal", { calLink, config });
    };
    document.addEventListener("click", onClick, true);

    // --- generate_lead : réservation Cal.com réussie ---
    let attempts = 0;
    const bind = () => {
      const cal = window.Cal;
      const ns = cal?.ns?.["30min"];
      if (!ns) {
        if (attempts++ < 50) setTimeout(bind, 200); // attend l'init Cal (~10s max)
        return;
      }
      ns("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          const d = e?.detail?.data || {};
          push({
            event: "generate_lead",
            cal_event_type: d.eventType?.slug || "30min",
            value: 0,
            currency: "EUR",
          });
        },
      });
    };
    bind();

    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
