"use client";

import { useEffect } from "react";

// Ralentit, SUR MOBILE, le reveal scrubbé du texte « À propos » de la home.
// L'animation native Webflow révèle le paragraphe sur ~838px de scroll, trop
// rapide pour la vitesse de lecture sur petit écran. On allonge la plage de
// scroll du ScrollTrigger (≈2×) en repoussant sa fin (`end`). Idempotent :
// réappliqué après chaque ré-init Webflow (event `wf-ix2-ready`) et au resize.
// Sur desktop on restaure la valeur d'origine du trigger (comportement inchangé).
export default function HomeAboutReveal() {
  useEffect(() => {
    const SEL = ".section-home-about .text-size-huge";
    const SLOW_END = "clamp(bottom -60%)"; // ~2,2× la distance d'origine
    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

    const apply = () => {
      const ST = window.ScrollTrigger;
      if (!ST) return false;
      if (!document.querySelector(SEL)) return false;
      const st = ST.getAll().find(
        (t) => t.trigger && t.trigger.matches && t.trigger.matches(SEL)
      );
      if (!st) return false;
      // Mémorise la fin d'origine de CETTE instance (recréée par Webflow à
      // chaque ré-init) pour pouvoir la restaurer sur desktop.
      if (st._wdOrigEnd === undefined) st._wdOrigEnd = st.vars.end;
      const want = isMobile() ? SLOW_END : st._wdOrigEnd;
      if (st.vars.end !== want) {
        st.vars.end = want;
        st.refresh();
      }
      return true;
    };

    let tries = 0;
    const id = setInterval(() => {
      if (apply() || ++tries > 100) clearInterval(id);
    }, 100);

    // Après une ré-init Webflow, le trigger est recréé : on retente un moment.
    const onReady = () => {
      let t = 0;
      const rid = setInterval(() => {
        if (apply() || ++t > 50) clearInterval(rid);
      }, 100);
    };
    window.addEventListener("wf-ix2-ready", onReady);

    let rt = null;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(apply, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(id);
      window.removeEventListener("wf-ix2-ready", onReady);
      window.removeEventListener("resize", onResize);
      clearTimeout(rt);
    };
  }, []);

  return null;
}
