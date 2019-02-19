import React from 'react';
import PropTypes from 'prop-types';
import UIkit from 'uikit';
import axios from 'axios';

import {
  SoonSelect,
  YearSelect,
  RevenueSelect,
  IndustrySelect,
} from 'Templates/MultiStepForm';

const LeftArrow = (
  <div className="uk-position-bottom-right uk-padding">
    <span
      data-uk-switcher-item="previous"
      data-uk-icon="icon: chevron-left; ratio: 1.5"
    >
      <span className="uk-hidden">Previous</span>
    </span>
  </div>
);

const RightArrow = (
  <div className="uk-position-bottom-right uk-padding">
    <span
      data-uk-switcher-item="next"
      data-uk-icon="icon: chevron-right; ratio: 1.5"
    >
      <span className="uk-hidden">Next</span>
    </span>
  </div>
);

const LeftRightArrow = (
  <div className="uk-position-bottom-right uk-padding">
    <span
      data-uk-switcher-item="previous"
      data-uk-icon="icon: chevron-left; ratio: 1.5"
    >
      <span className="uk-hidden">Previous</span>
    </span>
    <span
      data-uk-switcher-item="next"
      data-uk-icon="icon: chevron-right; ratio: 1.5"
    >
      <span className="uk-hidden">Next</span>
    </span>
  </div>
);

class MultiStepFormModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      soonSelect: '',
      yearSelect: '',
      revenueSelect: '',
      industrySelect: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      businessName: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.switcher = UIkit.switcher('.msf-tab', {
      connect: '.form-switcher',
      animation: 'uk-animation-fade',
      duration: '250',
      active: '1',
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });

    // TODO: there has to be a better way to do this
    if (this.switcher.index() !== 5) {
      this.switcher.show('next');
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    // TODO: this is weak and insecure spam protection, implement captcha in future
    const { honeypot } = this.state;
    if (honeypot) { return; }

    const {
      soonSelect,
      yearSelect,
      revenueSelect,
      industrySelect,
      firstName,
      lastName,
      email,
      phone,
      businessName,
    } = this.state;

    const { moneySelect } = this.props;

    const req = {
      moneySelect,
      soonSelect,
      yearSelect,
      revenueSelect,
      industrySelect,
      firstName,
      lastName,
      email,
      phone,
      businessName,
    };

    const formData = new FormData();

    Object.keys(req).forEach(key => formData.set(key, req[key]));

    UIkit.modal('#msf-modal').hide();
    UIkit.modal('#msf-submitting-modal').show();

    axios.post('https://script.google.com/a/vermilion.tech/macros/s/AKfycbwea5UMuk0KenY-RvrOB5GF40kCKPmIjwN-odukrA/exec',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          UIkit.modal('#msf-submitting-modal').hide();
          UIkit.modal('#msf-success-modal').show();
        }
      })
      .then((err) => {
        if (err) {
          UIkit.modal('#msf-submitting-modal').hide();
          UIkit.modal('#msf-error-modal').show();
        }
      });
  }

  render() {
    const { moneySelect } = this.props;

    return (
      <>
        <div id="msf-submitting-modal" data-uk-modal>
          <div className="uk-modal-dialog uk-padding-large">
            <h2 className="monet-text-gold">Application Submitting...</h2>
            <div className="uk-flex uk-flex-center uk-flex-middle" data-uk-spinner="ratio: 2;" />
          </div>
        </div>

        <div id="msf-success-modal" data-uk-modal>
          <div className="uk-modal-dialog uk-padding-large">
            <h2 className="monet-text-gold">Application Submitted</h2>
            <p>
              Thank you for choosing Monet Capital!
              We will be in touch within 24 hours.
              Please check your email for a copy of your application.
            </p>
          </div>
        </div>

        <div id="msf-error-modal" data-uk-modal>
          <div className="uk-modal-dialog uk-padding-large">
            <h2 className="uk-text-danger">Error Submitting Application</h2>
            <p>Please contact support@monetcap.com</p>
          </div>
        </div>

        <div id="msf-modal" data-uk-modal>
          <div className="uk-modal-dialog">
            <div className="multistepform uk-box-shadow-medium uk-flex">
              {/* tabs */}
              <div className=" uk-background-muted uk-width-1-4@s">
                <ul
                  className="msf-tab uk-tab uk-tab-left uk-margin-remove-bottom"
                >
                  <li>
                    <a href="#">{moneySelect}</a>
                  </li>
                  <li>
                    <a href="#">How Soon?</a>
                  </li>
                  <li>
                    <a href="#">Years in business</a>
                  </li>
                  <li>
                    <a href="#">Monthly revenue</a>
                  </li>
                  <li>
                    <a href="#">Industry</a>
                  </li>
                  <li>
                    <a href="#">Contact Information</a>
                  </li>
                </ul>
              </div>

              {/* form content */}
              <div className="uk-background-default uk-padding uk-width-expand uk-position-relative">
                <form onSubmit={this.handleSubmit}>
                  <ul className="form-switcher uk-switcher">
                    <li>
                      <div>
                        <h2 className="monet-text-gold">
                          {moneySelect}
                        </h2>
                      </div>

                      {RightArrow}
                    </li>
                    <li>
                      <fieldset className="uk-fieldset">
                        <legend className="uk-h2 uk-legend">
                          How soon do you need
                          {' '}
                          {moneySelect}
                          ?
                        </legend>

                        {SoonSelect.map((item, index) => (
                          <div className="uk-margin">
                            <label htmlFor={`soon-select-${index}`}>
                              <input
                                id={`soon-select-${index}`}
                                className="uk-radio"
                                type="radio"
                                name="soonSelect"
                                onChange={this.handleChange}
                                value={item}
                                required
                              />
                              {item}
                            </label>
                            <br />
                          </div>
                        ))}
                      </fieldset>
                      {RightArrow}
                    </li>

                    <li>
                      <fieldset className="uk-fieldset">
                        <legend className="uk-h2 uk-legend">
                          How many years have you been in business?
                        </legend>

                        {YearSelect.map((item, index) => (
                          <div className="uk-margin">
                            <label htmlFor={`year-select-${index}`}>
                              <input
                                id={`year-select-${index}`}
                                className="uk-radio"
                                type="radio"
                                name="yearSelect"
                                onChange={this.handleChange}
                                value={item}
                                required
                              />
                              {item}
                            </label>
                            <br />
                          </div>
                        ))}
                      </fieldset>
                      {LeftRightArrow}
                    </li>

                    <li>
                      <fieldset className="uk-fieldset">
                        <legend className="uk-h2 uk-legend">
                          What is your monthly revenue?
                        </legend>

                        {RevenueSelect.map((item, index) => (
                          <div className="uk-margin">
                            <label htmlFor={`revenue-select-${index}`}>
                              <input
                                id={`revenue-select-${index}`}
                                className="uk-radio"
                                type="radio"
                                name="revenueSelect"
                                onChange={this.handleChange}
                                value={item}
                                required
                              />
                              {item}
                            </label>
                            <br />
                          </div>
                        ))}
                      </fieldset>
                      {LeftRightArrow}
                    </li>

                    <li>
                      <div>
                        <h2 className="monet-text-gold">
                          What industry are you in?
                        </h2>

                        <div className="uk-margin">
                          <label htmlFor="industry-select">
                            Choose Industry
                            <select
                              id="industry-select"
                              name="industrySelect"
                              onChange={this.handleChange}
                              className="uk-select"
                            >
                              {IndustrySelect.map(item => (
                                <option>{item}</option>
                              ))}
                            </select>
                          </label>
                          <br />
                        </div>
                      </div>
                      {LeftRightArrow}
                    </li>

                    <li>
                      <div>
                        <h2 className="monet-text-gold">
                          How can we contact you?
                        </h2>

                        <div className="uk-margin">
                          <label
                            className="uk-form-label"
                            htmlFor="first-name"
                          >
                            First Name
                            <input
                              id="first-name"
                              className="uk-input"
                              type="text"
                              name="firstName"
                              onChange={this.handleChange}
                              placeholder="First Name"
                              required
                            />
                          </label>

                          <label
                            className="uk-form-label"
                            htmlFor="last-name"
                          >
                            Last Name
                            <input
                              id="last-name"
                              className="uk-input"
                              type="text"
                              name="lastName"
                              onChange={this.handleChange}
                              placeholder="Last Name"
                              required
                            />
                          </label>

                          <label
                            className="uk-form-label"
                            htmlFor="email-addr"
                          >
                            Email
                            <input
                              id="email-addr"
                              className="uk-input"
                              type="email"
                              name="email"
                              onChange={this.handleChange}
                              placeholder="Email Address"
                              required
                            />
                          </label>

                          <label
                            className="uk-form-label"
                            htmlFor="phone-num"
                          >
                            Phone
                            <input
                              id="phone-num"
                              className="uk-input"
                              type="text"
                              name="phone"
                              onChange={this.handleChange}
                              placeholder="Phone Number"
                              required
                            />
                          </label>

                          <label
                            className="uk-form-label"
                            htmlFor="business-name"
                          >
                            Business Name
                            <input
                              id="business-name"
                              className="uk-input"
                              type="text"
                              name="businessName"
                              onChange={this.handleChange}
                              placeholder="Business Name"
                              required
                            />
                          </label>

                        </div>

                        <button
                          className="uk-button uk-button-primary"
                          type="submit"
                        >
                          Get Funding Now
                        </button>
                      </div>
                      {LeftArrow}
                    </li>
                  </ul>
                  <label
                    className="uk-hidden"
                    htmlFor="honeypot"
                  >
                    Honeypot
                    <input onChange={this.handleChange} id="honeypot" type="text" name="honeypot" value="" />
                  </label>

                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

MultiStepFormModal.propTypes = {
  moneySelect: PropTypes.string.isRequired,
};

export default MultiStepFormModal;
