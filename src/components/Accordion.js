import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

const AccordionItem = (props) => {
  const { heading, body } = props;

  return (
    <li>
      <a type="button" className="uk-accordion-title uk-text-primary uk-padding">{heading}</a>
      <div
        className="uk-accordion-content uk-padding"
        dangerouslySetInnerHTML={{
          __html:
          body,
        }}
      />
    </li>
  );
};

AccordionItem.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

const ExampleAccordionItem = {
  heading: 'Loading...',
  body: 'Loading...',
};

export default class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accordionItems: [ExampleAccordionItem],
    };
  }

  componentDidMount() {
    axios.get('https://staging-backend.monetcap.com/api/home/sections/about/accordion?_format=json')
      .then((res) => {
        if (res.status === 200) {
          const items = res.data.map(item => ({
            heading: item.accordion_item_heading,
            body: item.accordion_item_body,
          }));

          this.setState({ accordionItems: items });
        }
      }, err => console.log(err));
  }

  render() {
    const { accordionItems } = this.state;

    return (
      <React.Fragment>

        <ul data-uk-accordion>

          {
            accordionItems.map(item => <AccordionItem {...item} />)
          }

        </ul>

      </React.Fragment>
    );
  }
}
