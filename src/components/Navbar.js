import React from 'react';

import MonetcapLogo from 'Images/monet-cap-logo.png';

const Navbar = (
  <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky uk-box-shadow-small">
    <nav className="uk-position-absolute uk-width-expand uk-navbar-container" data-uk-navbar>
      <div className="uk-navbar-left">
        <div className="uk-navbar-item uk-visible@m">
          <a href="#" className="uk-navbar-item uk-navbar-logo uk-width-small">
            <img data-src={MonetcapLogo} alt="logo" width="1920" height="1080" data-uk-img />
          </a>
        </div>
        <ul className="uk-navbar-nav uk-hidden@m">
          <li>
            <a href="tel:1-800-377-5554">
              <i className="material-icons md-36 uk-text-primary">phone</i>
            </a>
          </li>
        </ul>
      </div>

      <div className="uk-navbar-center uk-hidden@m">
        <a href="/" className="uk-navbar-item uk-logo"><img data-src={MonetcapLogo} alt="logo" width="120" data-uk-img /></a>
      </div>

      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav uk-visible@m">
          <li>
            {' '}
            <a href="#">
              <button type="button" className="uk-button uk-button-primary uk-border-rounded">Contact Us</button>
            </a>
            {' '}

          </li>

          <li>
            {' '}
            <a href="tel:1-800-377-5554">
              <i className="material-icons uk-margin-small-right uk-text-primary">phone</i>
              1-800-377-5554
            </a>
            {' '}

          </li>
        </ul>
        <ul className="uk-navbar-nav uk-hidden@m">
          <li>
            {' '}
            <a href="#" onClick={e => e.preventDefault()} data-uk-toggle="target: #offcanvas-navbar">
              <i className="material-icons md-36 uk-text-primary">menu</i>
            </a>
            {' '}

          </li>
        </ul>
      </div>

      <div id="offcanvas-navbar" uk-offcanvas="flip:true; overlay: true">
        <div className="uk-offcanvas-bar uk-padding-remove-horizontal uk-flex uk-flex-column">
          <div className="uk-text-center">
            <a href="/" className="uk-logo uk-text-center"><img data-src={MonetcapLogo} alt="logo" width="160" data-uk-img /></a>
            <a className="uk-offcanvas-close" type="button"><i className="material-icons md-36 uk-text-primary">close</i></a>
          </div>
          <ul className="uk-nav uk-nav-primary uk-margin-top">
            <li><a href="#section-partners" data-uk-scroll>Partners</a></li>
            <li><a href="#section-apply" data-uk-scroll>Apply now</a></li>
            <li><a href="#section-about" data-uk-scroll>About us</a></li>
            <li><a href="tel:1-800-377-5554">Contact us</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

export default Navbar;
