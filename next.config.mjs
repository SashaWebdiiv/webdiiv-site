/** @type {import('next').NextConfig} */

// Politique CSP. Sources autorisées = ce que le site charge réellement :
// - scripts : self + inline (init WebFont/Cal/GTM) + CDN GSAP/jQuery + Cal.com + GTM
// - connect : Cal.com + GTM + Google Analytics (collecte GA4)
// - styles  : self + inline (Webflow) + Google Fonts
// - fonts   : self + gstatic
// - frame   : Cal.com (widget de réservation embarqué)
// ⚠️ Démarrée en Report-Only (ne bloque rien, log console) le temps de valider
// le widget Cal.com + les polices dans un vrai navigateur, puis basculer en
// `Content-Security-Policy` (enforce).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://app.cal.com https://ajax.googleapis.com https://cdn.prod.website-files.com https://d3e54v103j8qbb.cloudfront.net https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://app.cal.com https://*.cal.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src https://app.cal.com https://cal.com",
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
  // CSP en mode observation (ne casse rien). Passer la clé à
  // "Content-Security-Policy" pour activer le blocage une fois validé.
  { key: "Content-Security-Policy-Report-Only", value: csp },
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
