"use client";

/**
 * Bouton « Gérer mes cookies » : efface le choix mémorisé et recharge la page,
 * ce qui ré-affiche la bannière de consentement (le consentement repart sur
 * « refusé » par défaut). Permet de retirer/modifier le consentement aussi
 * facilement qu'il a été donné (exigence CNIL).
 */
export default function CookiePreferencesButton() {
  const reopen = () => {
    try {
      localStorage.removeItem("webdiiv_consent");
    } catch {}
    window.location.reload();
  };

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        reopen();
      }}
      className="main-button w-inline-block"
    >
      <div className="main-button-block">
        <div className="button-text">Gérer mes cookies</div>
        <div className="button-text">Gérer mes cookies</div>
      </div>
    </a>
  );
}
