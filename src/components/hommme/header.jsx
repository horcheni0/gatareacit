import React from 'react';

function Header() {
  return (
    <header>
      <div className="topbar">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 text-sm">
              <div className="site-info">
                <a href="#" style={{ color: '#153D8A' }}><span className="mai-call text-primary"></span> +491776440005</a>
                <span className="divider">|</span>
                <a href="#"><span className="mai-mail text-primary"></span> info@gatagmbh.com</a>
              </div>
            </div>
            <div className="col-sm-4 text-right text-sm">
              <div className="social-mini-button">
                <a href="#"><span className="mai-logo-facebook-f" style={{ color: '#153D8A' }}></span></a>
                <a href="#"><span className="mai-logo-twitter" style={{ color: '#153D8A' }}></span></a>
                <a href="#"><span className="mai-logo-instagram" style={{ color: '#153D8A' }}></span></a>
              </div>
            </div>
          </div>
          <h3 style={{ color: '#fc0202' }} className="text-center">under construction</h3>
        </div>
      </div>
    </header>
  );
}

export default Header;
