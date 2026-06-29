"use client";

import { useEffect, useState } from "react";

const KEY = "webdiiv_consent";

/**
 * Bannière de consentement (CNIL/RGPD) couplée au Consent Mode v2.
 * - Par défaut, le consentement est « denied » (défini dans layout.js, avant GTM).
 * - « Accepter » → analytics_storage: granted + mémorisé.
 * - « Refuser »  → reste denied + mémorisé (bannière ne réapparaît pas).
 * Le choix est stocké dans localStorage ; « Refuser » est aussi accessible
 * qu'« Accepter » (exigence CNIL).
 */
export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let choice = null;
    try {
      choice = localStorage.getItem(KEY);
    } catch {}
    if (!choice) setOpen(true);
  }, []);

  const decide = (granted) => {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {}
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: granted ? "granted" : "denied",
      });
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div role="dialog" aria-label="Consentement aux cookies" style={S.wrap}>
      <p style={S.text}>
        Nous utilisons des cookies de mesure d'audience, notamment Google
        Analytics, afin de mieux comprendre l'utilisation du site. Vous pouvez
        les accepter ou les refuser : cela n'aura aucun impact sur votre
        navigation.{" "}
        <a href="/confidentialite" style={S.link}>
          En savoir plus
        </a>
        .
      </p>
      <div style={S.actions}>
        <button type="button" onClick={() => decide(false)} style={S.refuse}>
          Refuser
        </button>
        <button type="button" onClick={() => decide(true)} style={S.accept}>
          Accepter
        </button>
      </div>
    </div>
  );
}

const S = {
  wrap: {
    position: "fixed",
    left: "1rem",
    right: "1rem",
    bottom: "1rem",
    zIndex: 99999,
    maxWidth: "560px",
    margin: "0 auto",
    background: "#221d1d",
    color: "#e7dfca",
    borderRadius: "14px",
    padding: "1.25rem 1.25rem 1rem",
    boxShadow: "0 12px 40px rgba(0,0,0,.35)",
    fontFamily: "Epilogue, system-ui, sans-serif",
  },
  text: { margin: 0, fontSize: "0.9rem", lineHeight: 1.5 },
  link: { color: "#e7dfca", textDecoration: "underline" },
  actions: {
    display: "flex",
    gap: "0.75rem",
    marginTop: "1rem",
    justifyContent: "flex-end",
  },
  refuse: {
    cursor: "pointer",
    background: "transparent",
    color: "#e7dfca",
    border: "1px solid #e7dfca",
    borderRadius: "999px",
    padding: "0.5rem 1.25rem",
    fontSize: "0.9rem",
  },
  accept: {
    cursor: "pointer",
    background: "#e7dfca",
    color: "#221d1d",
    border: "1px solid #e7dfca",
    borderRadius: "999px",
    padding: "0.5rem 1.25rem",
    fontWeight: 600,
    fontSize: "0.9rem",
  },
};
