import WebflowPage from "./lib/WebflowPage";
import RealisationsWork from "./lib/RealisationsWork";
import HomeAboutReveal from "./lib/HomeAboutReveal";

// Métadonnées par défaut (title/description) définies dans app/layout.js.
export default function Home() {
  return (
    <>
      <WebflowPage file="home.html" />
      {/* Section « Nos réalisations » migrée dans home.html (entre Services et
          Méthodologie) : ses cartes empilées ont besoin du GSAP tilt + curseur. */}
      <RealisationsWork />
      {/* Ralentit le reveal du texte « À propos » sur mobile (lecture). */}
      <HomeAboutReveal />
    </>
  );
}
