import React from 'react';

import BackgroundImage1 from 'Images/teal-bg-image-1.png';
import BackgroundImage2 from 'Images/teal-bg-image-2.png';

import Hero from './components/Hero';

import Navbar from './components/Navbar';
import IconCarousel from './components/IconCarousel';
import Flipcards from './components/Flipcards';
import HighlightCards from './components/HighlightCards';
import IconGrid from './components/IconGrid';
import Accordion from './components/Accordion';
import Footer from './components/Footer';
import PartnerSignupForm from './components/PartnerSignupForm';

const App = (
  <React.Fragment>
    {Navbar}

    <Hero />

    <div className="uk-section uk-section-large">
      <div className="uk-container uk-text-center">
        <h1 className="uk-margin-large uk-text-primary">Some Industries We Serve</h1>

        {IconCarousel}

      </div>
    </div>

    <div className="uk-section uk-section-large uk-background-cover uk-background-norepeat" data-src={BackgroundImage2} data-uk-img>
      <div className="uk-container">
        <div className="uk-margin-large">
          <h1 className="uk-text-center uk-light">What People Say</h1>
        </div>

        {/* <Flipcards /> */}
        {Flipcards}

      </div>
    </div>

    <div className="uk-section uk-section-large">
      <div className="uk-container">
        <div className="uk-margin-large">
          <h1 className="uk-text-center uk-text-primary">About Us</h1>
        </div>

        <Accordion />


      </div>
    </div>

    <div id="section-partners" className="uk-section uk-section-large uk-background-cover uk-background-norepeat" data-src={BackgroundImage1} data-uk-img>
      <div className="uk-container">
        <div className="uk-margin-large">
          <h1 className="uk-text-center uk-light">Partners</h1>
        </div>
        <HighlightCards />
        <IconGrid />
        <button data-uk-toggle="#psf" className="uk-align-center uk-width-large uk-button uk-button-alternate" type="button">Sign up with us</button>
        <div id="psf" data-uk-modal>
          <div className="uk-modal-dialog">
            <PartnerSignupForm />
          </div>
        </div>
      </div>
    </div>

    <div className="uk-section uk-section-large uk-background-secondary ">
      <div className="uk-container">

        {Footer}

      </div>
    </div>
  </React.Fragment>
);

export default App;
