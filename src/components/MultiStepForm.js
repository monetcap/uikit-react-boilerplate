import React from 'react';
import UIkit from 'uikit';

import { MoneySelect } from 'Templates/MultiStepForm';
import MultiStepFormModal from './MultiStepFormModal';


class MultiStepForm extends React.Component {
  constructor(props) {
    super(props);

    this.modalName = '#msf-modal';

    this.state = {
      moneySelect: MoneySelect[0],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ moneySelect: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    UIkit.modal(this.modalName).show();
  }

  render() {
    const { moneySelect } = this.state;

    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="apply-now-trigger uk-flex uk-flex-middle uk-flex-right"
        >
          {/*
            A select specifying the amount of money the user wishes to apply for.
            This select is generated from an array called `MoneySelect`.
          */}
          <label
            className="uk-width-expand"
            htmlFor="money-select"
          >
            <select
              id="money-select"
              onChange={this.handleChange}
              className="uk-select"
            >
              {MoneySelect.map(item => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <span
              className="uk-hidden"
            >
              Select the amount of money you wish to apply for
            </span>
          </label>

          {/*
            An button which brings up the modal for the user to
            fill out the remainder of the `MultiStepForm`.
          */}
          <button type="submit" className="uk-button uk-button-primary uk-flex-">Apply Now</button>

          {/*
            Shown on `Apply Now` input submit button click. `moneySelect` state
            value is passed as a prop to the modal to seed the initial state of
            the `MultiStepFormModal` component.
          */}
        </form>
        <MultiStepFormModal moneySelect={moneySelect} />
      </div>
    );
  }
}

export default MultiStepForm;
