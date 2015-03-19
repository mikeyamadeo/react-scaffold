/*** @jsx React.DOM */
var React = require('react');
// import './styles/main.scss';
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