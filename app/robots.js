export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_application", "/_ia", "/_image-de-marque", "/_siteweb"],
    },
    sitemap: "https://webdiiv.com/sitemap.xml",
    host: "https://webdiiv.com",
  };
}
