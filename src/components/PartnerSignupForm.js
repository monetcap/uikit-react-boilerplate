import React from 'react';
import UIkit from 'uikit';
import axios from 'axios';

class PartnerSignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { honeypot } = this.state;
    if (honeypot) { return; }

    const {
      firstName,
      lastName,
      phone,
      email,
      businessName,
      message,
    } = this.state;

    const req = {
      firstName,
      lastName,
      phone,
      email,
      businessName,
      message,
    };


    const formData = new FormData();

    Object.keys(req).forEach(key => formData.set(key, req[key]));

    UIkit.modal('#psf').hide();
    UIkit.modal('#psf-submitting-modal').show();

    axios.post('https://script.google.com/macros/s/AKfycbwpkD6jzIpC94heMVWK-hQeDUftyVQxO76R4j-JYdFniesY0xM/exec',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          UIkit.modal('#psf-submitting-modal').hide();
          UIkit.modal('#psf-success-modal').show();
        }
      })
      .then((err) => {
        if (err) {
          UIkit.modal('#psf-submitting-modal').hide();
          UIkit.modal('#psf-error-modal').show();
        }
      });
  }

  render() {
    return (
      <>
        <div id="psf-submitting-modal" data-uk-modal>
          <div className="uk-modal-dialog uk-padding-large">
            <h2 className="monet-text-gold">Submitting...</h2>
            <div className="uk-flex uk-flex-center uk-flex-middle" data-uk-spinner="ratio: 2;" />
          </div>
        </div>

        <div id="psf-success-modal" data-uk-modal>
          <div className="uk-modal-dialog uk-padding-large">
            <h2 className="monet-text-gold">Submitted</h2>
            <p>
              Thank you for choosing Monet Capital!
              We will be in touch within 24 hours.
              We look forward to partnering with you!
            </p>
          </div>
        </div>

        <div id="psf-error-modal" data-uk-modal>
          <div className="uk-modal-dialog uk-padding-large">
            <h2 className="uk-text-danger">Error Submitting</h2>
            <p>Please contact support@monetcap.com</p>
          </div>
        </div>
        <div className="uk-background-primary uk-padding-large uk-text-center">
          <button className="uk-modal-close-default" type="button" data-uk-close />
          <span className="uk-text-uppercase uk-text-large uk-light uk-margin-bottom">Make more with monet</span>
          <form onSubmit={this.handleSubmit} className="uk-grid-small uk-text-small uk-margin-top" data-uk-grid>
            <div className="uk-width-1-4@s">
              <input className="uk-input" type="text" name="firstName" onChange={this.handleChange} placeholder="First name" required />
            </div>
            <div className="uk-width-1-4@s">
              <input className="uk-input" type="text" name="lastName" onChange={this.handleChange} placeholder="Last name" required />
            </div>
            <div className="uk-width-1-2@s">
              <input className="uk-input" type="text" name="phone" onChange={this.handleChange} placeholder="Phone number" required />
            </div>
            <div className="uk-width-1-2@s">
              <input className="uk-input" type="email" name="email" onChange={this.handleChange} placeholder="E-mail address" required />
            </div>
            <div className="uk-width-1-2@s">
              <input className="uk-input" type="text" name="businessName" onChange={this.handleChange} placeholder="Business name" required />
            </div>
            <div className="uk-width-1-1@s">
              <textarea className="uk-textarea" rows="4" name="message" onChange={this.handleChange} placeholder="Message" required />
              <button className="uk-button uk-button-alternate uk-text-center uk-align-center uk-width-1-2">Submit</button>
            </div>
            <input style={{ display: 'none' }} onChange={this.handleChange} id="honeypot" type="text" name="honeypot" value="" />
          </form>
        </div>
      </>

    );
  }
}

export default PartnerSignupForm;
