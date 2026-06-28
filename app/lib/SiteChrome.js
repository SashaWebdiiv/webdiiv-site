import fs from "node:fs";
import path from "node:path";

// Coquille partagée pour les pages construites EN CODE (nouvelles pages).
// Réutilise la nav et le footer Webflow existants (extraits dans app/_partials)
// pour rester 100% cohérent visuellement avec les pages "fidèles".
// Le contenu de la page (children) est écrit en JSX avec les classes Webflow.
function readPartial(file) {
  return fs.readFileSync(
    path.join(process.cwd(), "app", "_partials", file),
    "utf8"
  );
}

export default function SiteChrome({ children }) {
  const nav = readPartial("nav.html");
  const footer = readPartial("footer.html");

  return (
    <div className="page-wrapper">
      <div dangerouslySetInnerHTML={{ __html: nav }} />
      <main className="main-wrapper">
        {/* Cible de l'ancre "retour en haut" du footer (#top), comme sur la home,
            pour que Webflow fasse un défilement fluide au lieu d'un saut direct. */}
        <div id="top" className="back-to-top" />
        {children}
      </main>
      <div dangerouslySetInnerHTML={{ __html: footer }} />
    </div>
  );
}
