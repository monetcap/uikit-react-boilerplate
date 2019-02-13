import React from 'react';
import { storiesOf } from '@storybook/react';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons.min';

import 'Stylesheets/main.scss';

import { withViewport } from '@storybook/addon-viewport';

import MultiStepForm from 'Components/MultiStepForm';

UIkit.use(Icons);

// Decorators
const UKSectionContainerDecorator = ({ children }) => (
  <div className="uk-section uk-background-secondary">
    <div className="uk-container">
      { children }
    </div>
  </div>
);

storiesOf('MultiStepForm', module)
  .addDecorator(withViewport())
  .add('Default - 1920x1080', () => (
    <MultiStepForm />
  ), { viewport: 'res19201080' })
  .add('Default - iPad', () => (
    <MultiStepForm />
  ), { viewport: 'ipad' })
  .add('Default - iPhone X', () => (
    <MultiStepForm />
  ), { viewport: 'iphonex' });
