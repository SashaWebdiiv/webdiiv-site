import SiteChrome from "../lib/SiteChrome";
import CookiePreferencesButton from "../lib/CookiePreferencesButton";

export const metadata = {
  title: "Politique de confidentialité | Webdiiv",
  description:
    "Politique de confidentialité de Webdiiv : données collectées, finalités, cookies (Google Analytics), durées de conservation et tes droits RGPD.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
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
                  Vie privée
                </div>
              </div>
              <h1 className="heading-style-h2 text-align-center">
                Politique de confidentialité
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section className="section-home-about">
        <div className="padding-global">
          <div className="container-small">
            <div className="padding-section-medium legal-content">
              <p className="text-size-regular">
                Cette politique explique quelles données personnelles sont
                collectées sur <strong>webdiiv.com</strong>, pourquoi, combien de
                temps elles sont conservées, et quels sont tes droits.
              </p>

              <div className="spacer-large" />
              <h2 className="heading-style-h6">Responsable du traitement</h2>
              <div className="spacer-small" />
              <p className="text-size-regular">
                Sasha Cohen — Entrepreneur individuel, exerçant sous le nom
                « Webdiiv », 21 rue du Moulin à Vent, 94370 Sucy-en-Brie, France.
                <br />
                Contact :{" "}
                <a href="mailto:sasha@webdiiv.com" className="legal-link">
                  sasha@webdiiv.com
                </a>
                .
              </p>

              <div className="spacer-large" />
              <h2 className="heading-style-h6">Données collectées &amp; finalités</h2>
              <div className="spacer-small" />
              <p className="text-size-regular">
                <strong>Mesure d&apos;audience</strong> — via Google Analytics 4 :
                données de navigation (pages vues, interactions, type
                d&apos;appareil, données techniques). Finalité : comprendre
                l&apos;utilisation du site pour l&apos;améliorer. Base légale :
                ton consentement. Ces données ne sont collectées qu&apos;
                <strong>après ton accord</strong> via la bannière de cookies.
                <br />
                <br />
                <strong>Prise de rendez-vous</strong> — via Cal.com : nom, adresse
                email et informations que tu fournis lors de la réservation
                d&apos;un créneau. Finalité : organiser et confirmer le
                rendez-vous. Base légale : exécution de mesures précontractuelles
                à ta demande.
                <br />
                <br />
                <strong>Contact direct</strong> — si tu nous écris par email ou
                téléphone : les données que tu choisis de communiquer. Finalité :
                répondre à ta demande. Base légale : intérêt légitime.
              </p>

              <div className="spacer-large" />
              <h2 className="heading-style-h6">Destinataires &amp; sous-traitants</h2>
              <div className="spacer-small" />
              <p className="text-size-regular">
                Tes données peuvent être traitées par nos prestataires
                techniques : <strong>Google</strong> (mesure d&apos;audience GA4),{" "}
                <strong>Cal.com</strong> (prise de rendez-vous) et{" "}
                <strong>Vercel</strong> (hébergement du site). Certains de ces
                prestataires sont situés aux États-Unis ; les transferts hors
                Union européenne sont encadrés par des garanties appropriées
                (clauses contractuelles types et/ou Data Privacy Framework).
              </p>

              <div className="spacer-large" />
              <h2 className="heading-style-h6">Durées de conservation</h2>
              <div className="spacer-small" />
              <p className="text-size-regular">
                Données de mesure d&apos;audience : jusqu&apos;à 14 mois. Données
                de rendez-vous et de contact : le temps nécessaire au traitement
                de ta demande, puis archivage conformément aux obligations
                légales applicables.
              </p>

              <div className="spacer-large" />
              <h2 className="heading-style-h6">Cookies</h2>
              <div className="spacer-small" />
              <p className="text-size-regular">
                Le site utilise des cookies de <strong>mesure d&apos;audience</strong>{" "}
                (Google Analytics, via Google Tag Manager). Ces cookies ne sont
                déposés qu&apos;<strong>après ton consentement</strong>, recueilli
                via la bannière affichée lors de ta première visite. Les cookies
                strictement nécessaires au fonctionnement du site ne requièrent
                pas de consentement.
                <br />
                <br />
                Tu peux modifier ou retirer ton choix à tout moment :
              </p>
              <div className="spacer-small" />
              <div className="button-group">
                <CookiePreferencesButton />
              </div>

              <div className="spacer-large" />
              <h2 className="heading-style-h6">Tes droits</h2>
              <div className="spacer-small" />
              <p className="text-size-regular">
                Conformément au RGPD, tu disposes d&apos;un droit d&apos;accès, de
                rectification, d&apos;effacement, d&apos;opposition, de limitation
                et de portabilité de tes données. Pour les exercer, écris-nous à{" "}
                <a href="mailto:sasha@webdiiv.com" className="legal-link">
                  sasha@webdiiv.com
                </a>
                . Tu peux également introduire une réclamation auprès de la CNIL
                (
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legal-link"
                >
                  www.cnil.fr
                </a>
                ).
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
