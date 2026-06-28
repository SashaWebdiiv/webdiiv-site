import WebflowPage from "../lib/WebflowPage";
import BrandFaq from "../lib/BrandFaq";

// NOTE: la page Webflow d'origine avait un title/description placeholder
// (template "Astryon"). Valeurs SEO réécrites ici. Voir docs/log.md.
export const metadata = {
  title: "Image de marque & identité visuelle | Webdiiv",
  description:
    "Identité de marque pour TPE et indépendants : logo, charte graphique, supports de communication. Une image cohérente qui inspire confiance.",
};

export default function ImageDeMarquePage() {
  return (
    <>
      <WebflowPage file="image-de-marque.html" />
      <BrandFaq />
    </>
  );
}
