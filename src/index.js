import React from 'react';
import ReactDOM from 'react-dom';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons.min';

import './stylesheets/main.scss';

import App from './App';

UIkit.use(Icons);

ReactDOM.render(App, document.getElementById('app'));
