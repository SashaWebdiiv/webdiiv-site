/** @type {import('next').NextConfig} */

// Politique CSP. Sources autorisées = ce que le site charge réellement :
// - scripts : self + inline (init WebFont/Cal/GTM) + CDN GSAP/jQuery + Cal.com + GTM
// - connect : Cal.com + GTM + Google Analytics (collecte GA4)
// - styles  : self + inline (Webflow) + Google Fonts
// - fonts   : self + gstatic
// - frame   : Cal.com (widget de réservation embarqué)
// Validée en Report-Only (widget Cal.com + polices + GTM/GA OK en prod),
// puis passée en enforce (`Content-Security-Policy`) le 2026-07-05.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://app.cal.com https://ajax.googleapis.com https://cdn.prod.website-files.com https://d3e54v103j8qbb.cloudfront.net https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://app.cal.com https://*.cal.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src https://app.cal.com https://cal.com https://www.googletagmanager.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Anti-clickjacking (en plus de frame-ancestors pour les vieux navigateurs)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // HSTS : forcer HTTPS (2 ans, sous-domaines, preload)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // CSP en mode enforce : bloque ce qui n'est pas dans la liste.
  // (Repasser en "Content-Security-Policy-Report-Only" pour déboguer.)
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // /contact est en WIP (à retravailler). Redirection temporaire vers
  // l'accueil pour éviter tout 404 (les CTA ouvrent le pop Cal.com via JS).
  // permanent: false → 307, pour pouvoir republier /contact plus tard.
  async redirects() {
    return [{ source: "/contact", destination: "/", permanent: false }];
  },
};

export default nextConfig;
