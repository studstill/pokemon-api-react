var React = require('react');
var Pokemon = require('./Pokemon.jsx');

// Arena
module.exports = React.createClass({
  render: function() {
    return (
      <section className="arena">
        <Pokemon />
      </section>
    );
  }
});
