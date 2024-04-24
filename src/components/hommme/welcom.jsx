import React from 'react';

function WelcomeSection() {
  return (
    <div className="page-section pb-0">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 py-3 wow fadeInUp">
            <h1>Willkommen in Gata GmbH</h1>
            <p className="mb-4">Gut denken, gut sprechen, gut handeln" – diese Worte Zarathustras sind zeitlos und erinnern uns daran, dass Erfolg auf einem Fundament aus klarem Denken, überzeugender Kommunikation und konkretem Handeln beruht.
              Für hochqualifizierte Fachkräfte und erfahrene Führungskräfte, die eine berufliche Neuorientierung anstreben, ist Vertrauen von entscheidender Bedeutung. Unser Ziel ist es, sicherzustellen, dass unsere Mandanten in vertraulichen Top-Positionen erfolgreich platziert werden, die diskret vergeben werden und nicht öffentlich ausgeschrieben sind.
            </p>
            <div className="col-12 text-center mt-4 wow zoomIn">
              <a href="aboutT.html" className="btn btn-primary">mehr lesen</a>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
            <div className="img-place custom-img-1">
              <img src="assets/img/img3.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
