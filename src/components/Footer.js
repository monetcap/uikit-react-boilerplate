import React from 'react';

import BBBLogo from 'Images/ab-seal-horizontal-us.png';

const Footer = (
  <div className="footer uk-text-center">
    <ul className="footer-detail uk-margin-medium-bottom">
      <li>© 2019 Monet Capital</li>
      <li>81 Willoughby St, Brooklyn, NY 11201</li>
      <li>info@monetcap.com</li>
      <li><img data-src={BBBLogo} className="uk-width-small" alt="" data-uk-img /></li>
    </ul>

    <p className="footer-disclaimer">
      Monet Capital is a free, no obligation financial service, connecting
      prospective borrowers with prospective lenders for business funding.
    </p>
  </div>
);

export default Footer;
