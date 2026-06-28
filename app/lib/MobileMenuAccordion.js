"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Menu burger (overlay plein écran `.navigation`) : la section « Services »
// devient un ACCORDÉON sur mobile/tablette. Au tap sur le lien « Services »,
// la sous-liste (Site Web / IA / Application / Image de marque) se déplie /
// replie au lieu de naviguer. Le visuel (repli, chevron) vit dans globals.css
// (`.navigation-link-block.has-sub` / `.services-open`).
//
// Monté une fois (layout.js). On (re)marque les blocs à chaque route + après
// `wf-ix2-ready` (le menu est ré-injecté avec la page « fidèle »). Le clic est
// délégué en phase de capture pour passer AVANT le handler Webflow (qui sinon
// fermerait le menu / suivrait le lien).
export default function MobileMenuAccordion() {
  const pathname = usePathname();

  useEffect(() => {
    // Replie l'accordéon d'un coup (sans transition) — utilisé à la fermeture du
    // menu, pour que la sous-liste disparaisse EN MÊME TEMPS que l'overlay (sinon
    // elle persiste et le contenu dessous « traîne »).
    const collapseInstant = () => {
      document
        .querySelectorAll(".navigation-link-block.services-open")
        .forEach((block) => {
          const sub = block.querySelector(".navigation-sublist");
          if (sub) sub.style.transition = "none";
          block.classList.remove("services-open");
          if (sub) {
            void sub.offsetHeight; // force le reflow avant de rendre la transition
            sub.style.transition = "";
          }
        });
    };

    // Observe le bouton burger : quand Webflow lui retire `w--open` (= le menu se
    // ferme), on replie l'accordéon immédiatement.
    let observer = null;
    const watchMenuButton = () => {
      const btn = document.querySelector(".menu-button");
      if (!btn) return;
      if (observer) observer.disconnect();
      let wasOpen = btn.classList.contains("w--open");
      observer = new MutationObserver(() => {
        const isOpen = btn.classList.contains("w--open");
        if (wasOpen && !isOpen) collapseInstant();
        wasOpen = isOpen;
      });
      observer.observe(btn, { attributes: true, attributeFilter: ["class"] });
    };

    // Marque chaque bloc de lien qui possède une sous-liste (→ chevron + état)
    // et (re)branche l'observer du bouton burger.
    const tag = () => {
      document.querySelectorAll(".navigation-sublist").forEach((sub) => {
        const block = sub.closest(".navigation-link-block");
        if (block) block.classList.add("has-sub");
      });
      watchMenuButton();
    };
    tag();
    window.addEventListener("wf-ix2-ready", tag);

    // Clic sur le lien principal d'un bloc à sous-liste = toggle de l'accordéon.
    const onClick = (e) => {
      const link = e.target.closest(".navigation-link");
      if (!link) return;
      const block = link.closest(".navigation-link-block.has-sub");
      if (!block) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      block.classList.toggle("services-open");
    };
    document.addEventListener("click", onClick, true);

    // Vrai lien du menu (ancre `/#section`, sous-lien Services, bouton « Réserver
    // un appel ») : sur un lien d'ANCRE INTERNE, Webflow ne termine pas la
    // fermeture de l'overlay — le burger garde `w--open` et l'overlay plein écran
    // (`position:fixed`, transparent) reste au-dessus de la page en captant tous
    // les clics → plus rien n'est cliquable. On laisse Webflow tenter sa
    // fermeture, puis on force la fermeture NATIVE (re-tap du burger) s'il est
    // resté ouvert. Les clics sur « Services » (accordéon) sont déjà stoppés en
    // capture par `onClick` (stopImmediatePropagation) → ce handler ne se
    // déclenche pas pour eux.
    const onMenuLinkClick = (e) => {
      const link = e.target.closest(".navigation a, a.navigation-link");
      if (!link) return;
      setTimeout(() => {
        const btn = document.querySelector(".menu-button");
        if (btn && btn.classList.contains("w--open")) btn.click();
      }, 0);
    };
    document.addEventListener("click", onMenuLinkClick);

    return () => {
      window.removeEventListener("wf-ix2-ready", tag);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("click", onMenuLinkClick);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return null;
}
