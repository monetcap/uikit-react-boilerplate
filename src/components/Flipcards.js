import React from 'react';

import TestimonialRyan from 'Images/Ryan T.png';
import TestimonialClaire from 'Images/Claire E.png';
import TestimonialHenry from 'Images/Henry M.png';

const Flipcards = (
  <div data-uk-slider>
    <ul className="uk-slider-items uk-child-width-1-3@s uk-grid uk-margin">
      <li className="uk-text-center">
        <div className="uk-inline-clip uk-transition-toggle" tabIndex="-1">
          <img data-src={TestimonialRyan} alt="" data-uk-img />
          <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-default uk-text-left">
            <p>
              {'"'}
              Unlike traditional lenders, the people at Monet are extremely
              friendly and helpful. Plus, they specifically work with small
              businesses so their funding options are much more practical.
              {'"'}
            </p>
            <p className="uk-text-right uk-position-bottom uk-text-uppercase uk-text-bold uk-padding-small">Ryan T.</p>
          </div>
        </div>
      </li>
      <li className="uk-text-center">
        <div className="uk-inline-clip uk-transition-toggle" tabIndex="-1">
          <img data-src={TestimonialClaire} alt="" data-uk-img />
          <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-default uk-text-left">
            <p>
              {'"'}
              Monet Capital gave me more than a loan, they gave me a sense of
              security and hope for the future.
              {'"'}
            </p>
            <p className="uk-text-right uk-position-bottom uk-text-uppercase uk-text-bold uk-padding-small">Claire E.</p>
          </div>
        </div>
      </li>
      <li className="uk-text-center">
        <div className="uk-inline-clip uk-transition-toggle" tabIndex="-1">
          <img data-src={TestimonialHenry} alt="" data-uk-img />
          <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-default uk-text-left">
            <p>
              {'"'}
              My business partner and I needed working capital to cover payroll
              during the slow months and focus on what was really important,
              the busy season ahead!
              {'"'}
            </p>
            <p className="uk-text-right uk-position-bottom uk-text-uppercase uk-text-bold uk-padding-small">Henry M.</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
);

export default Flipcards;
