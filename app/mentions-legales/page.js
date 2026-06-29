import SiteChrome from "../lib/SiteChrome";

export const metadata = {
  title: "Mentions légales | Webdiiv",
  description:
    "Mentions légales du site webdiiv.com — éditeur, hébergeur et informations légales de Webdiiv (Sasha Cohen, entrepreneur individuel).",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <SiteChrome>
      <header className="section-home-intro">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="subtitle-wrap">
                <div className="subtitle">
                  <span className="asterisk" style={{ fontSize: "12px", bottom: 0 }}>
                    [01]
                  </span>{" "}
                  Informations légales
                </div>
              </div>
              <h1 className="heading-style-h2 text-align-center">
                Mentions légales
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section className="section-home-about">
        <div className="padding-global">
          <div className="container-small">
            <div className="padding-section-medium legal-content">
              <h2 className="heading-style-h6">Éditeur du site</h2>
              <div className="spacer-small" />
              <p className="text-size-regular">
                Le site <strong>webdiiv.com</strong> est édité par :<br />
                Sasha Cohen — Entrepreneur individuel (EI), exerçant sous le nom
                commercial « Webdiiv ».
                <br />
                Adresse : 21 rue du Moulin à Vent, 94370 Sucy-en-Brie, France.
                <br />
                Email :{" "}
                <a href="mailto:sasha@webdiiv.com" className="legal-link">
                  sasha@webdiiv.com
                </a>
                <br />
                Téléphone :{" "}
                <a href="tel:+33631392055" className="legal-link">
                  +33&nbsp;6&nbsp;31&nbsp;39&nbsp;20&nbsp;55
                </a>
                <br />
                SIRET : 905&nbsp;226&nbsp;825&nbsp;00024 (SIREN 905&nbsp;226&nbsp;825).
                <br />
                TVA : TVA non applicable, article 293&nbsp;B du CGI (franchise en
                base de TVA).
                <br />
                Entrepreneur individuel dispensé d&apos;immatriculation au
                Registre du Commerce et des Sociétés (RCS) et au Répertoire des
                Métiers (RM).
              </p>

              <div className="spacer-large" />
              <h2 className="heading-style-h6">Directeur de la publication</h2>
              <div className="spacer-small" />
              <p className="text-size-regular">Sasha Cohen.</p>

              <div className="spacer-large" />
              <h2 className="heading-style-h6">Hébergeur</h2>
              <div className="spacer-small" />
              <p className="text-size-regular">
                Le site est hébergé par :<br />
                Vercel Inc.
                <br />
                340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
                <br />
                Site web :{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legal-link"
                >
                  vercel.com
                </a>
              </p>

              <div className="spacer-large" />
              <h2 className="heading-style-h6">Propriété intellectuelle</h2>
              <div className="spacer-small" />
              <p className="text-size-regular">
                L&apos;ensemble des contenus présents sur le site (textes,
                images, logos, graphismes, structure, code) est, sauf mention
                contraire, la propriété de Webdiiv ou de ses partenaires, et est
                protégé par le droit de la propriété intellectuelle. Toute
                reproduction, représentation ou exploitation, totale ou
                partielle, sans autorisation écrite préalable est interdite.
              </p>

              <div className="spacer-large" />
              <h2 className="heading-style-h6">Responsabilité</h2>
              <div className="spacer-small" />
              <p className="text-size-regular">
                Webdiiv s&apos;efforce d&apos;assurer l&apos;exactitude des
                informations diffusées sur le site, mais ne saurait être tenu
                responsable des erreurs, omissions ou indisponibilités. Le site
                peut contenir des liens vers des sites tiers dont Webdiiv ne
                maîtrise pas le contenu et ne saurait être responsable.
              </p>

              <div className="spacer-large" />
              <h2 className="heading-style-h6">
                Données personnelles &amp; cookies
              </h2>
              <div className="spacer-small" />
              <p className="text-size-regular">
                Le traitement de tes données personnelles et l&apos;utilisation
                des cookies sont décrits dans notre{" "}
                <a href="/confidentialite" className="legal-link">
                  politique de confidentialité
                </a>
                .
              </p>

              <div className="spacer-large" />
              <h2 className="heading-style-h6">Droit applicable</h2>
              <div className="spacer-small" />
              <p className="text-size-regular">
                Les présentes mentions légales sont régies par le droit français.
              </p>

              <div className="spacer-medium" />
              <p className="text-size-small text-color-secondary">
                Dernière mise à jour : 28 juin 2026.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
