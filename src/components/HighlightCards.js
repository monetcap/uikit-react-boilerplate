import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

const HighlightCard = (props) => {
  const {
    highlightHeading,
    highlightBody,
  } = props;

  return (
    <div>
      <div className="uk-card uk-card-default uk-card-body">
        <h3 className="uk-card-title">{highlightHeading}</h3>
        <p className="uk-margin-bottom uk-text-left">{highlightBody}</p>
      </div>
    </div>
  );
};

HighlightCard.propTypes = {
  highlightHeading: PropTypes.string.isRequired,
  highlightBody: PropTypes.string.isRequired,
};

const ExampleHighlightCard = {
  highlightHeading: 'Loading...',
  highlightBody: 'Loading...',
};

export default class HighlightCards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      highlightCards: [ExampleHighlightCard],
    };
  }

  componentDidMount() {
    axios.get('https://staging-backend.monetcap.com/api/home/sections/partners/highlight_cards?_format=json')
      .then((res) => {
        if (res.status === 200) {
          const items = res.data.map(item => ({
            highlightHeading: item.highlight_heading,
            highlightBody: item.highlight_body,
          }));

          this.setState({ highlightCards: items });
        }
      }, err => console.log(err));
  }


  render() {
    const { highlightCards } = this.state;

    return (
      <React.Fragment>

        <div className="uk-child-width-1-2@m uk-grid-match uk-grid" data-uk-grid>
          {
            highlightCards.map(highlightCard => <HighlightCard {...highlightCard} />)
          }
        </div>

      </React.Fragment>
    );
  }
}
