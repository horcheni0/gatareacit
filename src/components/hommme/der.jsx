import React from 'react';

function GeschäftsführungSection() {
  return (
    <div className="page-section banner-home" style={{ backgroundImage: 'url(assets/img/f.png)' }}>
      <div className="container">
        <h1 className="text-center">Geschäftsführung</h1>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 py-3 wow zoomIn">
            <div className="card-doctor">
              <div className="header">
                <img src="assets/img/MA.jpg" alt="" />
                <div className="meta">
                  <a href="mailto:example@example.com"><span className="mai-mail"></span></a>
                  <a href="#"><span className="mai-logo-whatsapp"></span></a>
                </div>
              </div>
              <div className="body" style={{ color: '#0e76a8' }}>
                <p className="text-xl mb-0">Geschäftsführerin</p>
                <span className="text-sm text-grey">Frau H. Othman</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 py-3 wow zoomIn">
            <div className="card-doctor">
              <div className="header">
                <img src="assets/img/sii.jpg" alt="" />
                <div className="meta">
                  <a href="mailto:example@example.com"><span className="mai-mail"></span></a>
                  <a href="#"><span className="mai-logo-whatsapp"></span></a>
                </div>
              </div>
              <div className="body" style={{ color: '#0e76a8' }}>
                <p className="text-xl mb-0">Integrationsmanager</p>
                <span className="text-sm text-grey">Herr Z. Sellemi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeschäftsführungSection;
