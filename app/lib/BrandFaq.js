"use client";

import { useEffect } from "react";

// Accordéons autonomes pour la FAQ de la page Image de marque.
// Cette page tourne sous son propre id Webflow (pour ses interactions de section
// services) ; l'animation IX2 "Rotate 3D" et les accordéons réutilisables ne sont
// liés qu'aux pages Home/Contact. On gère donc ici l'ouverture/fermeture nous-mêmes
// (la rotation des ovales 3D, elle, est faite en CSS — voir globals.css).
export default function BrandFaq() {
  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll(".brand-faq .accordion-content-item")
    );
    const cleanups = [];

    items.forEach((item) => {
      const head = item.querySelector(".accordion-top-wrap");
      const wrap = item.querySelector(".accordion-content-wrap");
      if (!head || !wrap) return;

      head.style.cursor = "pointer";

      const onClick = () => {
        const opening = !item.classList.contains("is-open");
        // Fermer les autres (comportement accordéon, comme le template Webflow).
        items.forEach((other) => {
          if (other === item) return;
          other.classList.remove("is-open");
          const w = other.querySelector(".accordion-content-wrap");
          if (w) w.style.height = "0px";
        });
        item.classList.toggle("is-open", opening);
        wrap.style.height = opening ? wrap.scrollHeight + "px" : "0px";
      };

      head.addEventListener("click", onClick);
      cleanups.push(() => head.removeEventListener("click", onClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
