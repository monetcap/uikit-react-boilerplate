import React from 'react';
import HeroImage from 'Images/hero.jpg';
import axios from 'axios';
import MultiStepForm from './MultiStepForm';


export default class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: {
        hero_heading: 'Loading...',
        hero_body: 'Loading...',
        hero_image: HeroImage,
        hero_footer_text: 'Loading...',
      },
    };
  }

  componentDidMount() {
    axios
      .get('https://staging-backend.monetcap.com/api/home?_format=json')
      .then(
        (res) => {
          const data = res.data[0];

          this.setState({
            hero: {
              hero_heading: data.hero_heading,
              hero_body: data.hero_body,
              hero_image: data.hero_image,
              hero_footer_text: data.hero_footer_text,
            },
          });
        },
        err => console.log(err),
      );
  }

  render() {
    const { hero } = this.state;

    const heroImage = hero.hero_image;
    const heroHeading = hero.hero_heading;
    const heroBody = hero.hero_body;
    const heroFooterText = hero.hero_footer_text;

    return (
      <React.Fragment>
        <div
          className="uk-flex uk-flex-middle uk-flex-center uk-flex-column uk-background-norepeat uk-background-cover uk-background-blend-overlay background-test"
          data-src={heroImage}
          width="1920"
          height="1080"
          data-uk-img="data-uk-img"
          data-uk-height-viewport
        >
          <div className="uk-padding uk-width-1-1">
            <div className="uk-light">
              <h1>{heroHeading}</h1>
            </div>

            <div className="uk-child-width-1-2@s" data-uk-grid="data-uk-grid">
              <div
                className="uk-light"
                dangerouslySetInnerHTML={{
                  __html: heroBody,
                }}
              />

              <MultiStepForm />
            </div>
          </div>

          <div className="uk-position-bottom uk-text-center uk-padding-small uk-background-primary uk-light">
            {heroFooterText}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
