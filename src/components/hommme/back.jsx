import React from 'react';

function BannerHome() {
  return (
    <div className="page-section banner-home" style={{ backgroundImage: 'url(assets/img/f.png)' }}>
      <div className="container py-5 py-lg-0">
        <div className="row align-items-center">
          <div className="col-lg-8 wow fadeInRight">
            <h3 className="font-weight-normal mb-3">Was wir tun:<br />
              Das Bewerben für Top-Positionen ist in erster Linie ein Vertriebsprozess - alles andere ist zweitrangig.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerHome;
