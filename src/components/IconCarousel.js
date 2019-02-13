import React from 'react';

import IconRestaurant from 'Images/icon-restaurant.png';
import IconWholesale from 'Images/icon-wholesale.png';
import IconManufacturing from 'Images/icon-manufacturing.png';
import IconConstruction from 'Images/icon-construction.png';
import IconTrucking from 'Images/icon-trucking.png';
import IconRetail from 'Images/icon-retail.png';

const IconCarousel = (
  <div className="slider-carousel" data-uk-slider>
    <div className="uk-position-relative uk-visible-toggle" tabIndex="-1">
      <ul className="uk-slider-items uk-child-width-1-3@s uk-grid uk-margin">
        <li>
          <img data-src={IconRestaurant} alt="" data-uk-img />
          <div className="uk-padding-small uk-text-primary">Restaurants</div>
        </li>
        <li>
          <img data-src={IconWholesale} alt="" data-uk-img />
          <div className="uk-padding-small uk-text-primary">Wholesale</div>
        </li>
        <li>
          <img data-src={IconManufacturing} alt="" data-uk-img />
          <div className="uk-padding-small uk-text-primary">Manufacturing</div>
        </li>
        <li>
          <img data-src={IconConstruction} alt="" data-uk-img />
          <div className="uk-padding-small uk-text-primary">Construction</div>
        </li>
        <li>
          <img data-src={IconTrucking} alt="" data-uk-img />
          <div className="uk-padding-small uk-text-primary">Trucking</div>
        </li>
        <li>
          <img data-src={IconRetail} alt="" data-uk-img />
          <div className="uk-padding-small uk-text-primary">Retail</div>
        </li>
      </ul>


      <a className="uk-position-center-left" style={{ color: 'rgb(0, 129, 152)' }} data-uk-icon="icon: triangle-left; ratio: 3;" data-uk-slider-item="previous" />
      <a className="uk-position-center-right" style={{ color: 'rgb(0, 129, 152)' }} data-uk-icon="icon: triangle-right; ratio: 3;" data-uk-slider-item="next" />
    </div>
  </div>
);

export default IconCarousel;
