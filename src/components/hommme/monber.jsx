import React from 'react';

function OurTeamSection() {
  return (
    <div className="page-section bg-light">
      <h1 className="text-center mb-5 wow fadeInUp">unser Team</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row">
              <div className="col-md-6 col-lg-4 py-3 wow zoomIn">
                <div className="card-doctor">
                  <div className="header">
                    <img src="assets/img/img8.jpg" alt="" />
                    <div className="meta">
                      <a href="#"><span className="mai-mail"></span></a>
                      <a href="#"><span className="mai-logo-whatsapp"></span></a>
                    </div>
                  </div>
                  <div className="body" style={{ color: '#0e76a8' }}>
                    <p className="text-xl mb-0">M.Horcheni</p>
                    <span className="text-sm text-grey"></span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 py-3 wow zoomIn">
                <div className="card-doctor">
                  <div className="header">
                    <img src="assets/img/img10.jpg" alt="" />
                    <div className="meta">
                      <a href="#"><span className="mai-mail"></span></a>
                      <a href="#"><span className="mai-logo-whatsapp"></span></a>
                    </div>
                  </div>
                  <div className="body" style={{ color: '#0e76a8' }}>
                    <p className="text-xl mb-0">I.Abid</p>
                    <span className="text-sm text-grey"></span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 py-3 wow zoomIn">
                <div className="card-doctor">
                  <div className="header">
                    <img src="assets/img/sayda.jpg" alt="" />
                    <div className="meta">
                      <a href="#"><span className="mai-mail"></span></a>
                      <a href="#"><span className="mai-logo-whatsapp"></span></a>
                    </div>
                  </div>
                  <div className="body" style={{ color: '#0e76a8' }}>
                    <p className="text-xl mb-0">S. Jemai</p>
                    <span className="text-sm text-grey"></span>
                  </div>
                </div>
              </div>
              {/* Add similar code blocks for other team members */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurTeamSection;
