"use client";

import { useEffect } from "react";

// Reveal au scroll du texte "Pourquoi un site" sur la page Site web.
// L'animation Webflow d'origine (remplissage caractère par caractère, gris → noir,
// scrubbé au scroll) est limitée à la page Home (scope par id de page). Cette page
// tournant sous son propre id, on la rejoue en GSAP (déjà chargé via layout.js),
// scopée à .siteweb-reveal pour ne pas interférer avec Home/IA/Application.
export default function SitewebReveal() {
  useEffect(() => {
    const FADED = "hsla(0, 7.94%, 12.35%, 0.30)";
    let split = null;
    let trigger = null;
    let build = null;
    let tries = 0;

    const id = setInterval(() => {
      const { gsap, ScrollTrigger, SplitText } = window;
      if (!gsap || !ScrollTrigger || !SplitText) {
        if (++tries > 80) clearInterval(id);
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      // Sonde : le mot-clé `scrollTrigger` n'est réellement câblé qu'une fois le
      // plugin pleinement initialisé (course au chargement des scripts CDN).
      const probe = gsap.to({}, {
        duration: 0,
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom top" },
      });
      const wired = !!probe.scrollTrigger;
      if (probe.scrollTrigger) probe.scrollTrigger.kill();
      probe.kill();
      if (!wired) {
        if (++tries > 80) clearInterval(id);
        return;
      }
      clearInterval(id);

      const el = document.querySelector(".siteweb-reveal .text-size-huge");
      if (!el) return;

      const full =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--primary-color--black")
          .trim() || "#221d1d";

      // (Re)construit le reveal. ⚠️ wf.destroy() (WebflowInit, à chaque route) tue
      // tous les ScrollTriggers : on rejoue donc build() à l'événement "wf-ix2-ready"
      // émis par WebflowInit une fois sa ré-init terminée.
      build = () => {
        if (trigger) {
          trigger.kill();
          trigger = null;
        }
        if (split) {
          split.revert();
          split = null;
        }
        // "words, chars" : chaque mot reste insécable (évite les coupures), tout en
        // animant caractère par caractère.
        split = new SplitText(el, {
          type: "words, chars",
          wordsClass: "siteweb-reveal-word",
        });
        const tween = gsap.fromTo(
          split.chars,
          { color: FADED },
          { color: full, ease: "none", stagger: { each: 1, from: "start" } }
        );
        trigger = ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          end: "bottom 55%",
          scrub: 2,
          animation: tween,
        });
        ScrollTrigger.refresh();
      };

      const start = () => {
        build();
        window.addEventListener("wf-ix2-ready", build);
      };

      // Attendre les polices pour que le découpage en caractères soit correct.
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(start).catch(start);
      } else {
        start();
      }
    }, 100);

    return () => {
      clearInterval(id);
      try {
        if (build) window.removeEventListener("wf-ix2-ready", build);
        if (trigger) trigger.kill();
        if (split) split.revert();
      } catch (e) {
        /* noop */
      }
    };
  }, []);

  return null;
}
