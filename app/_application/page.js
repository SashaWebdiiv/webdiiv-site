import SiteChrome from "../lib/SiteChrome";
import Partial from "../lib/Partial";

export const metadata = {
  title:
    "Développement d'applications web sur-mesure pour TPE & indépendants | Webdiiv",
  description:
    "Applications web, outils métier sur-mesure et espaces clients. On conçoit et développe des applications simples qui collent à ta façon de travailler.",
};

// Page construite EN CODE (1ère version rédactionnelle — à corriger par Sasha).
// Réutilise les classes Webflow existantes (et les helpers .ia-* de globals.css)
// pour rester cohérent avec la page IA et le reste du site.
export default function ApplicationPage() {
  return (
    <SiteChrome>
      {/* HERO */}
      <header className="section-home-intro">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="subtitle-wrap">
                <div className="subtitle">
                  <span className="asterisk">✼</span> Développement d&apos;applications
                </div>
              </div>
              <h1 className="heading-style-h2 text-align-center">
                Une application
                <br />‍<span className="text-color-secondary">pour ton activité</span>
              </h1>
              <div className="spacer-medium" />
              <div className="container-small">
                <div className="text-align-center">
                  <div className="text-size-regular">
                    Tu jongles avec des fichiers Excel, des outils qui ne se parlent pas,
                    ou un logiciel qui ne fait jamais exactement ce qu&apos;il te faut ? On
                    conçoit et on développe des applications sur-mesure, simples à utiliser,
                    qui collent à ta façon de travailler. Du premier brief jusqu&apos;à la
                    mise en ligne, une seule équipe.
                  </div>
                </div>
              </div>
              <div className="spacer-large" />
              <div className="container-medium">
                <div className="button-group is-center">
                  <a href="/#tarifs" className="main-button w-inline-block">
                    <div className="main-button-block">
                      <div className="button-text">nos tarifs</div>
                      <div className="button-text">nos tarifs</div>
                    </div>
                    <img
                      loading="lazy"
                      src="/images/button-icon.svg"
                      alt=""
                      className="button-icon"
                    />
                  </a>
                  <a
                    href="/contact"
                    data-wf--button--variant="alternate"
                    className="main-button w-variant-4b25c70f-3f42-3b9e-8ed4-66eb721a6d73 w-inline-block"
                  >
                    <div className="main-button-block">
                      <div className="button-text">contact</div>
                      <div className="button-text">contact</div>
                    </div>
                    <img
                      loading="lazy"
                      src="/images/button-icon.svg"
                      alt=""
                      className="button-icon"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* INTRO */}
      <section className="section-home-about">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-medium">
              <div className="about-wrapper">
                <div className="about-left-wrap">
                  <div className="subtitle">✼ Pourquoi sur-mesure</div>
                </div>
                <div className="about-right-wrap">
                  <div className="text-size-huge">
                    Les logiciels du marché t&apos;obligent à t&apos;adapter à eux. Une
                    application sur-mesure fait l&apos;inverse : elle épouse ton métier.
                    <br />
                    Tu gagnes du temps sur les tâches répétitives, tu centralises tes infos
                    au même endroit, et tu offres une meilleure expérience à tes clients.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES DEV */}
      <section className="section-home-intro">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="subtitle-wrap">
                <div className="subtitle">
                  <span className="asterisk">✼</span> Ce qu&apos;on développe
                </div>
              </div>
              <h2 className="heading-style-h2 text-align-center">
                Ce qu&apos;on peut
                <br />‍<span className="text-color-secondary">construire pour toi</span>
              </h2>
              <div className="spacer-xlarge" />
              <div className="w-layout-grid section-home-services ia-services-grid">
                <div className="service-content-wrap">
                  <img
                    src="/images/browsers-bold.svg"
                    loading="lazy"
                    alt=""
                    className="service-icon"
                  />
                  <h3 className="service-title">application web</h3>
                  <div className="dividing-line" />
                  <p className="text-size-regular">
                    Une application accessible depuis un simple navigateur, sur ordinateur,
                    tablette ou mobile. Rien à installer : tes équipes et tes clients s&apos;y
                    connectent où qu&apos;ils soient. Idéale pour un outil de gestion, une
                    plateforme de réservation ou un tableau de bord.
                  </p>
                </div>
                <div className="service-content-wrap">
                  <img
                    src="/images/lego-bold.svg"
                    loading="lazy"
                    alt=""
                    className="service-icon"
                  />
                  <h3 className="service-title">outil métier sur-mesure</h3>
                  <div className="dividing-line" />
                  <p className="text-size-regular">
                    Un logiciel pensé pour ta façon de travailler, pas l&apos;inverse.
                    Gestion de devis, suivi de chantiers, planning, stock, base clients... On
                    développe exactement les fonctionnalités dont tu as besoin, sans le
                    superflu des outils tout-en-un.
                  </p>
                </div>
                <div className="service-content-wrap">
                  <img
                    src="/images/users-bold.svg"
                    loading="lazy"
                    alt=""
                    className="service-icon"
                  />
                  <h3 className="service-title">espace client</h3>
                  <div className="dividing-line" />
                  <p className="text-size-regular">
                    Un espace privé où tes clients retrouvent tout au même endroit : devis,
                    factures, documents, suivi de leur projet. Moins d&apos;allers-retours par
                    mail, une image plus professionnelle, et du temps gagné pour toi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÉTHODOLOGIE — repris du design "Comment ça se passe" de la home */}
      <section className="section-about-work-process">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="w-layout-grid top-content-grid">
                <div
                  id="w-node-f73e54f6-2a37-ec3a-8ec0-d37a2faff337-70224043"
                  className="content-item"
                >
                  <div className="subtitle-wrap left-flex">
                    <div className="subtitle">
                      <span className="asterisk">✼</span> Méthodologie
                    </div>
                  </div>
                  <h2 className="heading-style-h2">
                    Comment <br />
                    <span className="text-color-secondary">ça se passe ?</span>
                  </h2>
                </div>
                <div
                  id="w-node-f73e54f6-2a37-ec3a-8ec0-d37a2faff343-70224043"
                  className="content-item"
                >
                  <div className="inner-content">
                    <a
                      href="/contact"
                      data-wf--button--variant="alternate"
                      className="main-button w-variant-4b25c70f-3f42-3b9e-8ed4-66eb721a6d73 w-inline-block"
                    >
                      <div className="main-button-block">
                        <div className="button-text">contact</div>
                        <div className="button-text">contact</div>
                      </div>
                      <img
                        loading="lazy"
                        src="/images/button-icon.svg"
                        alt=""
                        className="button-icon"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="spacer-xlarge" />
              <div className="w-layout-grid process-component-grid ia-methodologie">
                <div className="process-content-box">
                  <div className="procees-content-block">
                    <div className="process-number-block">
                      <div>01</div>
                    </div>
                    <div className="process-content">
                      <h3 className="heading-style-h6">Cadrage &amp; maquettes</h3>
                      <div className="spacer-small" />
                      <div className="text-size-regular">
                        On clarifie ton besoin et on dessine les écrans avant d&apos;écrire
                        la moindre ligne de code. Tu valides le parcours et le design, sans
                        surprise.
                      </div>
                    </div>
                  </div>
                  <div className="procees-content-block">
                    <div className="process-number-block">
                      <div>02</div>
                    </div>
                    <div className="process-content">
                      <h3 className="heading-style-h6">
                        Développement &amp; itérations
                      </h3>
                      <div className="spacer-small" />
                      <div className="text-size-regular">
                        On développe par étapes et tu testes au fur et à mesure. Tu vois ton
                        application prendre forme et on ajuste ensemble à chaque retour.
                      </div>
                    </div>
                  </div>
                  <div className="process-line" />
                  <div className="procees-content-block">
                    <div className="process-number-block">
                      <div>03</div>
                    </div>
                    <div className="process-content">
                      <h3 className="heading-style-h6">Mise en ligne &amp; évolutions</h3>
                      <div className="spacer-small" />
                      <div className="text-size-regular">
                        On déploie, on te forme à l&apos;outil, et on reste là pour le faire
                        évoluer : nouvelles fonctionnalités, corrections, montée en charge.
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="w-node-f73e54f6-2a37-ec3a-8ec0-d37a2faff369-70224043"
                  className="process-image-wrap"
                >
                  <div className="process-shape">
                    <div className="right-corner w-embed">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 40V0C0 23.2548 16.7452 40 40 40H0Z"
                          fill="#fffcf7"
                        />
                      </svg>
                    </div>
                    <div className="right-corner top-corner w-embed">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 40V0C0 23.2548 16.7452 40 40 40H0Z"
                          fill="#fffcf7"
                        />
                      </svg>
                    </div>
                    <div className="shape-block alternate-block">
                      <div className="text-color-alternate">( c&apos;est nous ! )</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dividing-line" />
          </div>
        </div>
      </section>

      {/* FAQ — repris du design home (animation 3D + accordéons), contenu Application */}
      <Partial file="faq-application.html" />
    </SiteChrome>
  );
}
