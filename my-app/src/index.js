import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './components/App';
import MyRoute from './components/MyRoute';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MyRoute />, document.getElementById('root'));
// if (module.hot) {
//     module.hot.accept();
// }
registerServiceWorker();
