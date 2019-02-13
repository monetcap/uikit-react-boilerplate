import { configure } from '@storybook/react';
import { configureViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const resolutionViewports = {
  res19201080: {
    name: '1920 x 1080',
    style: {
      width: '1920px',
      heigth: '1080px',
    },
  },
};

configureViewport({ viewports: { ...INITIAL_VIEWPORTS, ...resolutionViewports } });

function loadStories() {
  require('./stories/index.js');
}

configure(loadStories, module);
