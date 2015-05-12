import './styles/main.scss';
import React from 'react';
import Router from 'react-router';
import routes from './config/routes';

Router.run(routes, function(Handler) {
	React.render(<Handler />, document.getElementById('app'));
});