import WebflowPage from "../lib/WebflowPage";

export const metadata = {
  title: "Contacte Webdiiv — parlons de ton projet",
  description:
    "Un premier échange de 30 min, gratuit et sans engagement. Réponse sous 24h. Raconte-nous ton projet — on te propose quelque chose dans les 48h.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contacte Webdiiv — parlons de ton projet",
    description:
      "Un premier échange de 30 min, gratuit et sans engagement. Réponse sous 24h.",
    type: "website",
    url: "/contact",
    siteName: "Webdiiv",
    locale: "fr_FR",
  },
};

export default function ContactPage() {
  return <WebflowPage file="contact.html" />;
}
