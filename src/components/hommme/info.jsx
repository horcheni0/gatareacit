import React from 'react';

function PageSection() {
  return (
    <div className="page-section">
      <h1 className="text-center mb-5 wow fadeInUp" style={{ color: '#153D8A' }}>TOP-POSITIONEN SIND VERTRAUENSSACHE</h1>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 py-3 wow fadeInUp">
            <p className="text-grey mb-4">
              Gut denken, gut sprechen, gut handeln" – diese Worte Zarathustras sind zeitlos und erinnern uns daran, dass Erfolg auf einem Fundament aus klarem Denken, überzeugender Kommunikation und konkretem Handeln beruht.
              Für hochqualifizierte Fachkräfte und erfahrene Führungskräfte, die eine berufliche Neuorientierung anstreben, ist Vertrauen von entscheidender Bedeutung. Unser Ziel ist es, sicherzustellen, dass unsere Mandanten in vertraulichen Top-Positionen erfolgreich platziert werden, die diskret vergeben werden und nicht öffentlich ausgeschrieben sind.
              Schon lange bevor Corona und KI unseren Arbeitsmarkt prägten, haben wir auf innovative Dienstleistungen gesetzt, die gleichermaßen hochqualifizierte Fachkräfte und erfahrene Führungskräfte ansprechen. Statt traditioneller Ansätze wie Outplacement oder Newplacement bieten wir einen exklusiven Service an, der Research und ein tiefes Verständnis für den Stellenmarkt kombiniert. Standard-Karriereberatung oder psychologische Unterstützung, die oft nicht erforderlich ist, finden Sie bei uns nicht. Stattdessen unterstützen wir Sie mit maßgeschneiderten Lösungen und einem proaktiven Vertriebsansatz.
            </p>
            <div className="col-12 text-center mt-4 wow zoomIn">
              <a href="about.html" className="btn btn-primary">mehr lesen</a>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
            <div className="img-place custom-img-1">
              <img src="assets/img/MA.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageSection;
