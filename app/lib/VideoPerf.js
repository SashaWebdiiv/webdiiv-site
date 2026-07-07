"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Optimisation des background-videos Webflow (grosse source de lag sur vieux
// appareils). Deux objectifs :
//  1. Un seul décodage vidéo à la fois : on ne LIT que la vidéo réellement
//     visible (les background-videos hero + footer se décodaient toutes deux en
//     même temps). On observe le wrapper `.w-background-video` (stable) plutôt
//     que le <video> interne, car webflow.js peut remplacer ce dernier après
//     l'init → un observer posé sur l'ancien nœud ne se déclencherait jamais.
//  2. Sur appareil faible / saveData / prefers-reduced-motion : AUCUNE vidéo
//     lue, le poster (image de fond du <video>) reste affiché.
//
// La lecture reste native (webflow autoplay) : on ne met PAS `preload="none"`
// sur les vidéos, sinon le buffer s'affame et la vidéo se fige après ~1 s.
function isLowPower() {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    // Signal RÉSEAU : uniquement `saveData` (choix explicite de l'utilisateur).
    // Pas d'`effectiveType` (2g/3g) : peu fiable, souvent faux en local/dev
    // (Chrome rapporte "3g" sur localhost) → couperait le hero à tort.
    const conn = navigator.connection;
    if (conn && conn.saveData) return true;
    if (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4)
      return true;
    if (typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4) return true;
  } catch (e) {
    /* noop */
  }
  return false;
}

export default function VideoPerf() {
  const pathname = usePathname();

  useEffect(() => {
    const lowPower = isLowPower();
    let cleanup = null;

    // Laisse le DOM Webflow s'installer (HTML injecté + webflow.js) avant de
    // reprendre la main sur les vidéos.
    const setup = () => {
      const wraps = Array.from(document.querySelectorAll(".w-background-video"));
      if (!wraps.length) return false;

      const cleanups = [];

      wraps.forEach((wrap) => {
        // Toujours re-cibler la vidéo live (webflow peut remplacer le nœud).
        const getVideo = () => wrap.querySelector("video");

        if (lowPower) {
          const v = getVideo();
          if (v) {
            v.muted = true;
            v.removeAttribute("autoplay");
            v.preload = "none";
          }
          // webflow.js / le navigateur peuvent relancer play() → on re-pause.
          // Capture sur le wrapper : attrape l'événement `play` (non bubblant)
          // du <video> interne pendant la phase de capture.
          const forcePause = () => {
            const vid = getVideo();
            if (vid) {
              try {
                vid.pause();
              } catch (e) {
                /* noop */
              }
            }
          };
          forcePause();
          wrap.addEventListener("play", forcePause, true);
          cleanups.push(() => wrap.removeEventListener("play", forcePause, true));
          return;
        }

        // Appareil normal : lecture uniquement quand le bloc est (proche d')à
        // l'écran ; pause sinon → un seul décodage à la fois.
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const v = getVideo();
              if (!v) return;
              if (entry.isIntersecting) {
                v.play().catch(() => {});
              } else {
                try {
                  v.pause();
                } catch (e) {
                  /* noop */
                }
              }
            });
          },
          // rootMargin : on démarre un peu avant l'entrée réelle dans la vue.
          { rootMargin: "200px 0px", threshold: 0.01 }
        );
        io.observe(wrap);
        cleanups.push(() => io.disconnect());
      });

      cleanup = () => cleanups.forEach((fn) => fn());
      return true;
    };

    // Réessaie tant que le HTML Webflow n'est pas encore monté (SPA + injection).
    let tries = 0;
    const id = setInterval(() => {
      if (setup() || ++tries > 40) clearInterval(id);
    }, 100);

    return () => {
      clearInterval(id);
      if (cleanup) cleanup();
    };
  }, [pathname]);

  return null;
}
