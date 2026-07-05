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

      // Le bouton flottant ouvre déjà son propre modal. Pour les liens inline
      // (`[data-cal-link]`), l'embed Cal n'auto-bind pas car ils portent un
      // `href` de repli → on ouvre le modal nous-mêmes et on bloque la nav.
      if (isFloating) return;
      const calLink = trigger.getAttribute?.("data-cal-link");
      const ns = window.Cal?.ns?.[trigger.getAttribute?.("data-cal-namespace") || "30min"];
      if (!calLink || !ns) return; // Cal pas prêt → on laisse le href de repli
      e.preventDefault();
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
