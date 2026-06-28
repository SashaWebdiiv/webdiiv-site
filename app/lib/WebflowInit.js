"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Webflow stocke ses interactions (IX2) PAR PAGE, identifiées par l'attribut
// `data-wf-page` sur <html>. En SPA Next.js, toutes les routes partagent le même
// layout, donc il faut poser le bon id de page selon la route AVANT de
// ré-initialiser IX2 — sinon seules les interactions de la home se chargent.
const WF_PAGE_IDS = {
  "/": "69e5caf3d98683c970224043",
  "/siteweb": "69e5caf3d98683c970224049",
  "/tarifs": "69e5caf3d98683c970224050",
  "/image-de-marque": "69f2e1ffc9ea817d8fe9468d",
  "/contact": "69e5caf3d98683c970224046",
  // Page IA (construite en code) : on réutilise l'id de page de la home pour que
  // les interactions IX2 réutilisées (FAQ : accordéons + bloc 3D) se chargent.
  "/ia": "69e5caf3d98683c970224043",
  // Page Application (idem IA) : réutilise l'id home pour les accordéons +
  // bloc 3D de la FAQ.
  "/application": "69e5caf3d98683c970224043",
  // Page Réalisations (construite en code, animations en GSAP) : on réutilise
  // l'id home uniquement pour que les interactions de NAV (dropdown, menu) se
  // chargent. Les animations de la page sont gérées par app/lib/RealisationsWork.js.
  "/realisations": "69e5caf3d98683c970224043",
};

export default function WebflowInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Poser le bon id de page Webflow pour cette route. Pour les nouvelles pages
    // construites en code (hors table), retirer l'attribut pour ne pas appliquer
    // par erreur les interactions d'une autre page.
    const pageId = WF_PAGE_IDS[pathname];
    if (pageId) {
      document.documentElement.setAttribute("data-wf-page", pageId);
    } else {
      document.documentElement.removeAttribute("data-wf-page");
    }

    // Recalcule les positions de déclenchement des animations au scroll. À appeler
    // après le chargement des polices/vidéos qui décalent la mise en page, sinon
    // les triggers GSAP/ScrollTrigger se retrouvent au mauvais endroit et les
    // animations ne se déclenchent pas (ex. reveal de la section "Pourquoi l'IA").
    const refreshScrollTrigger = () => {
      try {
        window.ScrollTrigger && window.ScrollTrigger.refresh();
      } catch (e) {
        /* noop */
      }
    };

    let tries = 0;
    const id = setInterval(() => {
      const wf = typeof window !== "undefined" ? window.Webflow : undefined;
      if (wf && typeof wf.require === "function") {
        clearInterval(id);
        try {
          // ⚠️ wf.destroy() appelle ScrollTrigger.killAll() en interne (le template
          // Advysion l'y branche) : il efface donc TOUS les ScrollTriggers GSAP,
          // y compris ceux de nos pages en code. On prévient les composants GSAP
          // via l'événement "wf-ix2-ready" (plus bas) pour qu'ils les reconstruisent.
          wf.destroy();
          wf.ready();
          const ix2 = wf.require("ix2");
          if (ix2 && typeof ix2.init === "function") ix2.init();
        } catch (e) {
          console.warn("Webflow re-init:", e);
        }
        // Signale que la ré-init Webflow (dont le destroy destructeur) est passée :
        // les composants GSAP peuvent (re)créer leurs ScrollTriggers sans risque.
        try {
          window.dispatchEvent(new CustomEvent("wf-ix2-ready"));
        } catch (e) {
          /* noop */
        }
        // Rafraîchir maintenant + après que tout se soit stabilisé
        refreshScrollTrigger();
        setTimeout(refreshScrollTrigger, 600);
        setTimeout(refreshScrollTrigger, 1500);
      } else if (++tries > 50) {
        // ~5s max d'attente que webflow.js soit chargé
        clearInterval(id);
      }
    }, 100);

    // Rafraîchir aussi quand la page est complètement chargée et les polices prêtes
    window.addEventListener("load", refreshScrollTrigger);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refreshScrollTrigger).catch(() => {});
    }

    return () => {
      clearInterval(id);
      window.removeEventListener("load", refreshScrollTrigger);
    };
  }, [pathname]);

  return null;
}
