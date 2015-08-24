var React = require('react');
var Arena = require('./components/Arena.jsx')

// Main App
var App = React.createClass({
  render: function() {
    return (
      <Arena />
    );
  }
});

React.render(
  <App />,
  document.getElementById('content')
);
