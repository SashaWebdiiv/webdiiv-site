"use client";

import { useEffect } from "react";

// Nav « scroll-aware » façon Gemeos.
// - En haut de page : nav pleine (logo + liens + bouton).
// - Scroll vers le BAS : la nav se replie en pastille centrée (bouton + burger)
//   → classe `nav-compact` sur `.navbar`.
// - Scroll vers le HAUT : elle se redéploie en pleine largeur.
// Le visuel et les transitions vivent dans globals.css (`.navbar.nav-compact`).
// Monté une seule fois (layout.js) ; `.navbar` est requêtée à chaque frame, donc
// le comportement suit la navbar même quand elle est ré-injectée au changement
// de route (pages « fidèles » + SiteChrome partagent la même classe).
export default function NavScroll() {
  useEffect(() => {
    const TOP_ZONE = 80; // sous ce seuil : toujours pleine (haut de page)
    let lastY = window.scrollY;

    const update = () => {
      const navbar = document.querySelector(".navbar");
      if (!navbar) {
        lastY = window.scrollY;
        return;
      }
      // Le repli est une fonctionnalité DESKTOP (le CSS est en @media ≥992px) :
      // sous 992px la nav garde son comportement responsive normal (logo + burger).
      const isDesktop = window.innerWidth >= 992;
      // Ne pas replier quand le menu plein écran (burger) est ouvert.
      const menuOpen = navbar.querySelector(".menu-button.w--open");
      const y = window.scrollY;

      // Détection sur le SENS du scroll (pas son intensité) : dès qu'on descend
      // la nav se replie, dès qu'on remonte elle se redéploie — même au plus
      // petit mouvement.
      if (!isDesktop || menuOpen) {
        navbar.classList.remove("nav-compact");
      } else if (y <= TOP_ZONE) {
        navbar.classList.remove("nav-compact");
      } else if (y > lastY) {
        navbar.classList.add("nav-compact"); // descend
      } else if (y < lastY) {
        navbar.classList.remove("nav-compact"); // remonte
      }
      lastY = y;
    };

    // Toggle d'une simple classe : assez léger pour tourner directement dans le
    // handler de scroll (passif), sans rAF.
    window.addEventListener("scroll", update, { passive: true });
    update();

    // En mode replié, le burger NE doit PAS ouvrir le menu plein écran Webflow :
    // il redéploie simplement la nav desktop. On intercepte le clic en phase de
    // capture (avant le handler Webflow) et on stoppe sa propagation.
    const onBurgerClick = (e) => {
      const navbar = document.querySelector(".navbar");
      if (!navbar || !navbar.classList.contains("nav-compact")) return;
      const burger = e.target.closest(".menu-button");
      if (!burger || !navbar.contains(burger)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      navbar.classList.remove("nav-compact"); // redéploie la nav desktop
      lastY = window.scrollY; // évite un repli immédiat au micro-scroll suivant
    };
    document.addEventListener("click", onBurgerClick, true);

    return () => {
      window.removeEventListener("scroll", update);
      document.removeEventListener("click", onBurgerClick, true);
    };
  }, []);

  return null;
}
