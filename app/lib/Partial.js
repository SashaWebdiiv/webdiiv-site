import fs from "node:fs";
import path from "node:path";

// Injecte un fragment HTML Webflow conservé tel quel (app/_partials/<file>).
// Utile pour réutiliser des sections riches en interactions Webflow (ex. FAQ)
// sans les réécrire en JSX, en préservant les data-w-id (animations IX2).
export default function Partial({ file }) {
  const html = fs.readFileSync(
    path.join(process.cwd(), "app", "_partials", file),
    "utf8"
  );
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
