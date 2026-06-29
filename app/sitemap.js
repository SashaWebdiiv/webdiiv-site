export default function sitemap() {
  const base = "https://webdiiv.com";
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // /contact retiré : page en WIP (à retravailler avant publication).
  ];
}
