import "./globals.css";
import Script from "next/script";
import WebflowInit from "./lib/WebflowInit";
import NavScroll from "./lib/NavScroll";
import MobileMenuAccordion from "./lib/MobileMenuAccordion";
import BenefitCards from "./lib/BenefitCards";

const TITLE = "Agence web TPE & indépendants | Webdiiv";
const DESCRIPTION =
  "Webdiiv accompagne les TPE et indépendants : site web professionnel, identité visuelle, réseaux sociaux. Livraison en 3-4 semaines. Premier échange gratuit.";

export const metadata = {
  metadataBase: new URL("https://webdiiv.com"),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "/",
    siteName: "Webdiiv",
    locale: "fr_FR",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Webdiiv" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Webdiiv",
  description: DESCRIPTION,
  url: "https://webdiiv.com",
  logo: "https://webdiiv.com/images/LOGO-creme.svg",
  email: "sasha@webdiiv.com",
  telephone: "+33631392055",
  areaServed: "FR",
  founder: { "@type": "Person", name: "Sasha Cohen" },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      data-wf-page="69e5caf3d98683c970224043"
      data-wf-site="69e5caf3d98683c970224056"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Feuilles de style Webflow (conservées telles quelles - phase fidèle) */}
        <link rel="stylesheet" href="/css/normalize.css" />
        <link rel="stylesheet" href="/css/webflow.css" />
        <link rel="stylesheet" href="/css/webdiiv-staging.webflow.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="body" suppressHydrationWarning>
        {children}
        <WebflowInit />
        <NavScroll />
        <MobileMenuAccordion />
        <BenefitCards />

        {/* Google Fonts via WebFont loader (Epilogue + League Spartan) */}
        <Script
          src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
          strategy="beforeInteractive"
          integrity="sha384-pvXSwSU09c+q9mPyY++ygUHWIYRoaxgnJ/JC5wcOzMb/NVVu+IDniiB9qWp3ZNWM"
          crossOrigin="anonymous"
        />
        <Script id="webfont-init" strategy="beforeInteractive">
          {`WebFont.load({google:{families:["Epilogue:300,400,500,600,700","League Spartan:300,400,500,600,700"]}});`}
        </Script>

        {/* jQuery (requis par webflow.js) puis interactions Webflow IX2 */}
        <Script
          src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=69e5caf3d98683c970224056"
          strategy="beforeInteractive"
          integrity="sha384-ZvpUoO/+PpLXR1lu4jmpXWu80pZlYUAfxl5NsBMWOEPSjUn/6Z/hRTt8+pR6L4N2"
          crossOrigin="anonymous"
        />
        <Script src="/js/webflow.js" strategy="afterInteractive" />

        {/* Animations GSAP utilisées par le template Webflow (toutes les pages) */}
        <Script
          src="https://cdn.prod.website-files.com/gsap/3.15.0/gsap.min.js"
          strategy="afterInteractive"
          integrity="sha384-XmJ9SoHtVOHoQUcKvFAzVXwdkKo1Ie3bhmSoIAkcdsHGaIrVJIkmozyq0FJeb/Ly"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.prod.website-files.com/gsap/3.15.0/SplitText.min.js"
          strategy="afterInteractive"
          integrity="sha384-SWJ0lLVRoipvHh59xj0pL7uC7Ih51F+5smaFtrG+2nr+TlDZU5SYJHmxfolbeNTr"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.prod.website-files.com/gsap/3.15.0/ScrollTrigger.min.js"
          strategy="afterInteractive"
          integrity="sha384-wl5TeDVvOWt30Pbf8aSo2ZrzsOjddu3avOBvHe+p+OhJt9gP6w9YXmDkN5DK2/dF"
          crossOrigin="anonymous"
        />

        {/* Bouton flottant de prise de rendez-vous Cal.com (site-wide) */}
        <Script id="cal-embed" strategy="afterInteractive">
          {`(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "30min", {origin:"https://app.cal.com"});
Cal.ns["30min"]("floatingButton", {"calLink":"sasha-cohen-webdiiv/30min","config":{"layout":"month_view","useSlotsViewOnSmallScreen":"true"},"buttonTextColor":"#e7dfca","buttonColor":"#221d1d","buttonText":"On commence ?","hideButtonIcon":true});
Cal.ns["30min"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#221d1d"},"dark":{"cal-brand":"#e7dfca"}},"hideEventTypeDetails":false,"layout":"month_view"});`}
        </Script>
      </body>
    </html>
  );
}
