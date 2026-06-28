import SiteChrome from "../lib/SiteChrome";
import Partial from "../lib/Partial";

export const metadata = {
  title: "Intelligence artificielle pour TPE & indépendants | Webdiiv",
  description:
    "Chatbots & assistants IA, agents sur-mesure, automatisations IA. Des outils concrets qui font gagner du temps et des clients aux TPE et indépendants.",
};

// Page construite EN CODE (1ère version rédactionnelle — à corriger par Sasha).
// Réutilise les classes Webflow existantes pour rester cohérent avec le site.
export default function IaPage() {
  return (
    <SiteChrome>
      {/* HERO */}
      <header className="section-home-intro">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="subtitle-wrap">
                <div className="subtitle">
                  <span className="asterisk">✼</span> Intelligence artificielle
                </div>
              </div>
              <h1 className="heading-style-h2 text-align-center">
                Mets l&apos;IA au travail
                <br />‍<span className="text-color-secondary">dans ton entreprise</span>
              </h1>
              <div className="spacer-medium" />
              <div className="container-small">
                <div className="text-align-center">
                  <div className="text-size-regular">
                    L&apos;IA n&apos;est pas réservée aux grandes entreprises. On la rend
                    accessible aux indépendants et petites structures : des chatbots qui
                    répondent à leur place, des agents qui gèrent les tâches répétitives,
                    des automatisations qui relient leurs outils. Une seule équipe, du
                    premier brief jusqu&apos;à la mise en production.
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
                  <div className="subtitle">✼ Pourquoi l&apos;IA</div>
                </div>
                <div className="about-right-wrap">
                  <div className="text-size-huge">
                    Aujourd&apos;hui, une petite équipe peut faire le travail de plusieurs.
                    <br />
                    On t&apos;aide à utiliser l&apos;IA là où elle compte vraiment : moins de
                    tâches manuelles, des réponses plus rapides à tes clients, et plus de
                    temps pour ton métier.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES IA */}
      <section className="section-home-intro">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="subtitle-wrap">
                <div className="subtitle">
                  <span className="asterisk">✼</span> Nos services IA
                </div>
              </div>
              <h2 className="heading-style-h2 text-align-center">
                Ce qu&apos;on peut
                <br />‍<span className="text-color-secondary">mettre en place</span>
              </h2>
              <div className="spacer-xlarge" />
              <div className="w-layout-grid section-home-services ia-services-grid">
                <div className="service-content-wrap">
                  <img
                    src="/images/chats-circle-bold.svg"
                    loading="lazy"
                    alt=""
                    className="service-icon"
                  />
                  <h3 className="service-title">support client</h3>
                  <div className="dividing-line" />
                  <p className="text-size-regular">
                    Un support client toujours disponible et réactif. Il répond
                    instantanément aux questions de tes clients en s&apos;appuyant sur une
                    base de connaissance de ton entreprise, ou les oriente vers ton
                    support, voire un commercial, quand c&apos;est nécessaire.
                  </p>
                </div>
                <div className="service-content-wrap">
                  <img
                    src="/images/robot-bold.svg"
                    loading="lazy"
                    alt=""
                    className="service-icon"
                  />
                  <h3 className="service-title">agent sur mesure</h3>
                  <div className="dividing-line" />
                  <p className="text-size-regular">
                    Un agent qui analyse, repère ce qui coince et fait des recommandations.
                    Il surveille ton SEO en continu, traite tes emails du quotidien,
                    remonte des données dans un dashboard et te propose des améliorations
                    concrètes. Tu définis la mission, il la mène.
                  </p>
                </div>
                <div className="service-content-wrap">
                  <img
                    src="/images/line-segments-bold.svg"
                    loading="lazy"
                    alt=""
                    className="service-icon"
                  />
                  <h3 className="service-title">automatisations</h3>
                  <div className="dividing-line" />
                  <p className="text-size-regular">
                    Là où le chatbot parle à tes clients et l&apos;agent réfléchit,
                    l&apos;automatisation exécute. Une suite d&apos;actions prédéfinies qui
                    se déclenchent toutes seules : envoi de devis, relances de paiement,
                    confirmations de rendez-vous, mise à jour du CRM. Pas de réflexion,
                    juste de la fiabilité.
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
                      <h3 className="heading-style-h6">Audit &amp; cadrage</h3>
                      <div className="spacer-small" />
                      <div className="text-size-regular">
                        On analyse ton activité et tes outils pour repérer où l&apos;IA
                        peut vraiment t&apos;aider : support client, tâches chronophages,
                        opportunités manquées.
                      </div>
                    </div>
                  </div>
                  <div className="procees-content-block">
                    <div className="process-number-block">
                      <div>02</div>
                    </div>
                    <div className="process-content">
                      <h3 className="heading-style-h6">
                        Conception &amp; mise en place
                      </h3>
                      <div className="spacer-small" />
                      <div className="text-size-regular">
                        On conçoit la solution (support IA, agent ou automatisation) et on
                        la branche sur tes outils existants. Tu testes, on ajuste ensemble.
                      </div>
                    </div>
                  </div>
                  <div className="process-line" />
                  <div className="procees-content-block">
                    <div className="process-number-block">
                      <div>03</div>
                    </div>
                    <div className="process-content">
                      <h3 className="heading-style-h6">Déploiement &amp; suivi</h3>
                      <div className="spacer-small" />
                      <div className="text-size-regular">
                        On déploie, on te forme, et on reste là pour faire évoluer la
                        solution dans le temps. Tu n&apos;es pas seul.
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

      {/* FAQ — repris du design home (animation 3D + accordéons), contenu IA */}
      <Partial file="faq-ia.html" />
    </SiteChrome>
  );
}
