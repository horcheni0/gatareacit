import React from 'react';

function BannerHomeSection() {
  return (
    <div className="page-section banner-home" style={{ backgroundImage: "url(assets/img/h.jpg)" }}>
      <div className="container py-5 py-lg-0">
        <div className="row align-items-center">
          <div className="col-lg-4 wow zoomIn">
            <div className="img-banner d-none d-lg-block">
              <img src="assets/img/logo4.png" alt="" />
            </div>
          </div>
          <div className="col-lg-8 wow fadeInRight">
            <h1 className="font-weight-normal mb-3">Das Bewerben für Top-Positionen ist in erster Linie ein Vertriebsprozess - alles andere ist zweitrangig.</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerHomeSection;
