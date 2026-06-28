"use client";

import { useEffect } from "react";

// Animations de la page Réalisations, rejouées en GSAP (déjà chargé via layout.js).
// Reprend fidèlement le template Oranzon :
//  - Titre : la ligne du haut glisse de -110%→0, celle du bas de +110%→0, scrubbé au scroll.
//  - Curseur CTA : pastille qui scale 0→1 au survol d'une carte (≈ inOutQuint) et suit la souris.
export default function RealisationsWork() {
  useEffect(() => {
    let tries = 0;
    const cleanups = [];

    const id = setInterval(() => {
      const { gsap, ScrollTrigger } = window;
      if (!gsap || !ScrollTrigger) {
        if (++tries > 80) clearInterval(id);
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      // Sonde : le mot-clé `scrollTrigger` n'est réellement câblé qu'une fois le
      // plugin pleinement initialisé (course au chargement des scripts CDN). On
      // crée un trigger jetable et on ne poursuit que s'il s'attache vraiment —
      // sinon gsap ignore silencieusement `scrollTrigger` (warning "not available").
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

      // 1) Inclinaison 3D des cartes au scroll (reprise du template Scalient) -
      // Chaque carte arrive penchée en arrière (rotateX, charnière en bas) et se
      // redresse à plat en atteignant sa position d'empilement — scrubbé au scroll.
      // Appliqué sur .rea-card-inner (pas sur l'élément sticky) pour ne pas casser
      // le position:sticky du parent.
      //
      // ⚠️ wf.destroy() (déclenché par WebflowInit à chaque changement de route)
      // tue tous les ScrollTriggers. On encapsule donc la création dans buildTilt()
      // et on la rejoue à l'événement "wf-ix2-ready" émis par WebflowInit une fois
      // sa ré-init (dont le destroy) terminée.
      const tiltTriggers = [];
      const buildTilt = () => {
        tiltTriggers.forEach((t) => t.kill());
        tiltTriggers.length = 0;
        document.querySelectorAll("[data-rea-card]").forEach((card) => {
          const tween = gsap.fromTo(
            card,
            { rotateX: 26, transformPerspective: 1400, transformOrigin: "50% 100%" },
            { rotateX: 0, ease: "none" }
          );
          // La carte se fige en position:sticky à `top` (cf. .rea-card en CSS).
          // On termine le tilt EXACTEMENT à ce point d'ancrage : ainsi chaque carte
          // est parfaitement à plat quand elle se cale — y compris la dernière.
          //
          // ⚠️ Le trigger est posé sur l'élément EXTERNE `.rea-card` (sans transform),
          // PAS sur l'inner : l'inner porte déjà rotateX:26 + perspective au moment du
          // refresh → ScrollTrigger lirait une bounding-box transformée/décalée et
          // calerait mal le `end` (tilt qui finit quand la carte est déjà sortie).
          const stickEl = card.closest(".rea-card");
          const stickTop = stickEl ? parseFloat(getComputedStyle(stickEl).top) || 0 : 0;
          const st = ScrollTrigger.create({
            trigger: stickEl || card,
            start: "top bottom",
            end: `top ${stickTop}px`,
            scrub: true,
            animation: tween,
          });
          tiltTriggers.push(st);
        });
        ScrollTrigger.refresh();
      };
      buildTilt();
      window.addEventListener("wf-ix2-ready", buildTilt);
      cleanups.push(() => {
        window.removeEventListener("wf-ix2-ready", buildTilt);
        tiltTriggers.forEach((t) => t.kill());
      });

      // 2) Curseur CTA par carte ---------------------------------------------
      document.querySelectorAll("[data-rea-card]").forEach((card) => {
        const cursor = card.querySelector("[data-rea-cursor]");
        if (!cursor) return;

        // Suivi fluide de la souris (centré sur le pointeur).
        const xTo = gsap.quickTo(cursor, "left", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "top", { duration: 0.5, ease: "power3" });

        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          xTo(e.clientX - r.left - cursor.offsetWidth / 2);
          yTo(e.clientY - r.top - cursor.offsetHeight / 2);
        };
        const onEnter = (e) => {
          // Place le curseur sous le pointeur dès l'entrée, sans transition.
          const r = card.getBoundingClientRect();
          gsap.set(cursor, {
            left: e.clientX - r.left - cursor.offsetWidth / 2,
            top: e.clientY - r.top - cursor.offsetHeight / 2,
          });
          gsap.to(cursor, { scale: 1, duration: 0.8, ease: "expo.out" });
        };
        const onLeave = () => {
          gsap.to(cursor, { scale: 0, duration: 0.6, ease: "expo.out" });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearInterval(id);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
