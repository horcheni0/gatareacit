import React from 'react';
import ContactUS from "../../views/admin/help/index"

function Footer() {
  return (
    <footer className="page-footer">
      <div className="container">
     
        <div className="row px-md-3">
          <div className="col-sm-6 col-lg-3 py-3">
            <ul className="footer-menu">
              <h5>ANGABEN GEMÄSS§5TMG </h5>

              <li><a href="#">GATA Gmbh</a></li>
              <li><a href="#">GOTTESWAG 56</a></li>
              <li><a href="#">50969 KÖLN</a></li>
              <li><a href="#">VERTRETEN  DURCH</a></li>
              <li><a href="#">H.OTHMAN</a></li>
              <li><a href="#">Z.SELLEMI</a></li>
            </ul>
          </div>
          <div className="col-sm-6 col-lg-3 py-3">
            <h5>KONTAKT</h5>
            <ul className="footer-menu">
              <li><a href="#" className="mai-call">Telefon:+491776440005</a></li>
              <li><a href="#" className="mai-logo-whatsapp"> Telefon:+4917660305329</a></li>
              <li><a href="#" className="mai-call"> Telefon:+4922154814320</a></li>
              <li><a href="#" className="mai-call"> Telefon:+4932123404467</a></li>
              <li><a href="#" className="mai-mail">E-Mail :info@gatagmbh.com</a></li>
              <li><a href="#" className="mai-mail">E-Mail :zsellemi@gatagmbh.com</a></li>
            </ul>
          </div>
          <div className="col-sm-6 col-lg-3 py-3">
            <h5> </h5>
            <ul className="footer-menu">
              <li><a href="#">AMTSGERICHT :KÖLN</a></li>
              <li><a href="#">HBR:93155</a></li>
              <li><a href="#">ST.-NR.:219/5814/3869</a></li>
              <li><a href="#">UST.-IDNR. :DE322902266</a></li>
            </ul>
          </div>
          <p style={{ clear: 'both' }}> STREITSCHLICHTUNG:
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr. Unsere E-Mail-Adresse finden Sie oben im Impressum Wir </p>
          <div className="col-sm-6 col-lg-3 py-3">
            <div className="footer-sosmed mt-3">
              <a href="#" target="_blank"><span className="mai-logo-facebook-f"></span></a>
              <a href="#" target="_blank"><span className="mai-logo-twitter"></span></a>
              <a href="#" target="_blank"><span className="mai-logo-google-plus-g"></span></a>
              <a href="#" target="_blank"><span className="mai-logo-instagram"></span></a>
              <a href="#" target="_blank"><span className="mai-logo-linkedin"></span></a>
              <div className="container"></div>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;
