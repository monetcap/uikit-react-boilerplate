import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

const IconGridItem = (props) => {
  const {
    iconImage,
    iconImageAltText,
    iconCaption,
  } = props;

  return (
    <div>
      <figure className="uk-thumbnail">
        <img data-src={iconImage} alt={iconImageAltText} data-uk-img />
        <figcaption className="uk-thumbnail-caption">{iconCaption}</figcaption>
      </figure>
    </div>
  );
};

IconGridItem.propTypes = {
  iconImage: PropTypes.string.isRequired,
  iconImageAltText: PropTypes.string.isRequired,
  iconCaption: PropTypes.string.isRequired,
};

const ExampleIcon = {
  iconCaption: 'Loading...',
  iconImage: 'Loading...',
  iconImageAltText: 'Loading...',
};

export default class IconGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icons: [ExampleIcon],
    };
  }

  componentDidMount() {
    axios.get('https://staging-backend.monetcap.com/api/home/sections/partners/icon_grid?_format=json')
      .then((res) => {
        if (res.status === 200) {
          const items = res.data.map(item => ({
            iconImage: item.icon_image,
            iconCaption: item.icon_caption,
            iconImageAltText: item.icon_image_alt_text,
          }));

          this.setState({ icons: items });
        }
      }, err => console.log(err));
  }

  render() {
    const { icons } = this.state;

    return (
      <React.Fragment>


        <div className="uk-child-width-1-2@s uk-child-width-1-4@m  uk-text-center uk-grid uk-margin-large">

          {
            icons.map(icon => <IconGridItem {...icon} />)
          }
        </div>

      </React.Fragment>
    );
  }
}
