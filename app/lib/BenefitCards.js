"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Cartes « bénéfice » (section livrable) : bascule AVANT → APRÈS.
// - Desktop (souris) : survol (mouseenter/leave) → état « après ».
// - Tactile (pas de hover) : un tap bascule la carte, UNE seule « après » à la fois ;
//   on adapte aussi l'indice du pied (icône doigt + texte « Touchez… »).
// Tout passe par la classe `.is-active` (le CSS ne dépend plus de `:hover`).
const FINGER_SVG =
  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8ed7b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 14a8 8 0 0 1-8 8"></path><path d="M18 11v-1a2 2 0 0 0-2-2 2 2 0 0 0-2 2"></path><path d="M14 10V9a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1"></path><path d="M10 9.5V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v10"></path><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path></svg>';

export default function BenefitCards() {
  const pathname = usePathname();

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll(".section-home-delivery .benefit-card")
    );
    if (!cards.length) return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    const cleanups = [];

    if (isTouch) {
      // Adapter l'indice du pied : icône doigt + « Touchez… »
      cards.forEach((card) => {
        const hintIcon = card.querySelector(".benefit-card__hint-icon");
        if (hintIcon) hintIcon.innerHTML = FINGER_SVG;
        const before = card.querySelector(
          ".benefit-card__hint-text .state-before"
        );
        if (before)
          before.textContent = "Touchez la carte pour découvrir l’après";
      });

      // Tap → bascule, une seule carte ouverte à la fois.
      const onTap = (e) => {
        const card = e.currentTarget;
        const wasActive = card.classList.contains("is-active");
        cards.forEach((c) => c.classList.remove("is-active"));
        if (!wasActive) card.classList.add("is-active");
      };
      cards.forEach((card) => {
        card.addEventListener("click", onTap);
        cleanups.push(() => card.removeEventListener("click", onTap));
      });
    } else {
      // Desktop : survol natif via JS (le CSS écoute `.is-active`).
      cards.forEach((card) => {
        const enter = () => card.classList.add("is-active");
        const leave = () => card.classList.remove("is-active");
        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
