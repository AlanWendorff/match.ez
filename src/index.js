import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './styles/base.css';
import './styles/efectos.css';

import './styles/teamStyles/Furious.css';
import './styles/teamStyles/Isurus.css';
import './styles/teamStyles/Kaster.css';
import './styles/teamStyles/River.css';
import './styles/teamStyles/Sharks.css';
import './styles/teamStyles/Cream.css';
import './styles/teamStyles/Malvinas.css';
import './styles/teamStyles/ca-wygers.css';
import './styles/teamStyles/np.css';
import './styles/teamStyles/mibr.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
