import fs from "node:fs";
import path from "node:path";

// Phase "fidèle" de la migration : injecte le markup Webflow d'une page,
// conservé tel quel dans app/<file>.html. Les scripts (jQuery, webflow.js,
// GSAP, Cal.com) sont chargés une seule fois dans app/layout.js.
export default function WebflowPage({ file }) {
  const html = fs.readFileSync(path.join(process.cwd(), "app", file), "utf8");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
