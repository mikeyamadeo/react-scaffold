/*** @jsx React.DOM */
import React from 'react';
import './styles/main.scss';

var App = React.createClass({

  render: function() {
    return(
      <div>
        <h1>Let's Get Reactin</h1>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('app'));