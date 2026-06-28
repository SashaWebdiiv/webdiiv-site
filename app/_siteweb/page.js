import WebflowPage from "../lib/WebflowPage";
import SitewebReveal from "../lib/SitewebReveal";

export const metadata = {
  title: "Création site web professionnel TPE & indépendants | Webdiiv",
  description:
    "Site web professionnel pour TPE et indépendants. Design sur mesure, SEO optimisé, responsive. Livré en 3-4 semaines. Dès 2 900€. Paiement en 3 fois.",
};

export default function SiteWebPage() {
  return (
    <>
      <WebflowPage file="siteweb.html" />
      <SitewebReveal />
    </>
  );
}
