import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm" style={{ color: '#153D8A' }}>
      <div className="container">
        <img src="assets/img/logo4.png" alt="GATA Logo" className="logo" />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupport" aria-controls="navbarSupport" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupport">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="index.html">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="about.html">was wir tun</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">unsere kunden</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">unsere mandanten</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">projeckablauf</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">unser konzept</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">Kontakt&vorgespräch</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">gata invest</a>
            </li>

           
          <li><a href="/auth/sign-in">Login</a></li>
        

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
