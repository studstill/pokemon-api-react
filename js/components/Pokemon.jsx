var React = require('react');
var request = require('superagent');

// Pokemon
module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: {},
      enemy: {},
    };
  },

  // Execute 3 API requests, per the assignment spec
  componentDidMount: function() {
    // Fetch entire pokedex
    request
      .get('http://pokeapi.co/api/v1/pokedex/1/')
      .end(function(err, res) {
        var pokemonArray = res.body.pokemon;
        // Randomly assign two pokemon
        var randomUser = pokemonArray[Math.floor(Math.random() * 100)];
        var randomEnemy = pokemonArray[Math.floor(Math.random() * 100)];
        // Fetch User's Pokemon resource
        request
          .get('http://pokeapi.co/' + randomUser.resource_uri)
          .end(function(err, res) {
            res.body.maxHp = res.body.hp;
            this.setState({
              user: (res.body)
            });
          }.bind(this));
        // Fetch Enemy's Pokemon resource
        request
          .get('http://pokeapi.co/' + randomEnemy.resource_uri)
          .end(function(err, res) {
            res.body.maxHp = res.body.hp;
            this.setState({
              enemy: (res.body)
            });
          }.bind(this));
      }.bind(this));
  },

  attack1: function() {
    // Vary Low strength, guaranted hit
    this.state.enemy.hp = this.state.enemy.hp - 5;
    this.enemyAttack();
  },
  attack2: function(pokemon) {
    // Low strength, high probability
    var odds = Math.floor(Math.random() * 10);
    if (odds > 2) {
      this.state.enemy.hp = this.state.enemy.hp - Math.floor(Math.random() * 10 + 10);
    }
    this.enemyAttack();
  },
  attack3: function(pokemon) {
    // High strength, low probability
    var odds = Math.floor(Math.random() * 10);
    if (odds > 5) {
      this.state.enemy.hp = this.state.enemy.hp - Math.floor(Math.random() * 20 + 10);
    }
    this.enemyAttack();
  },
  attack4: function(pokemon) {
    // Super high strength, vary low probability
    var odds = Math.floor(Math.random() * 10);
    if (odds > 7) {
      this.state.enemy.hp = this.state.enemy.hp - Math.floor(Math.random() * 50 + 30);
    }
    this.enemyAttack();
  },

  enemyAttack: function() {
    this.state.user.hp = this.state.user.hp - Math.floor(Math.random() * 20);
    setTimeout(function() {
      this.setState({
        enemy: this.state.enemy
      });
    }.bind(this),100);
  },


  renderPokemon: function(pokemon, player) {
    if (pokemon.hp > 0) {
      return (
        <section className={player}>
          {player}
          <img src={'http://pokeapi.co/media/img/' + pokemon.pkdx_id + '.png'} />
          <span>
            {pokemon.name}
             Hp {pokemon.hp}/{pokemon.maxHp}
          </span>
          <span>
            <button onClick={this.attack1}>Attack 1</button>
            <button onClick={this.attack2}>Attack 2</button>
            <button onClick={this.attack3}>Attack 3</button>
            <button onClick={this.attack4}>Attack 4</button>
          </span>
        </section>
      );
    }
  },

  youLose: function() {
    return (
      <section className='user'>
        <h1>You lose. :(</h1>
      </section>
    );
  },

  youWin: function() {
    return (
      <section className='user'>
        <h1>You win!</h1>
      </section>
    );
  },

  render: function() {
    // Don't render until the data has come back from the server
    if (this.state.user.name && this.state.user.name) {
      // Check if you win or lose
      if (this.state.user.hp <= 0 && this.state.enemy.hp > 0) {
        return this.youLose();
      } else if (this.state.user.hp > 0 && this.state.enemy.hp <= 0) {
        return this.youWin();
      // Render Pokemon for battle
      } else {
        return (
          <div className="pokemon">
            {this.renderPokemon(this.state.user, 'user')}
            {this.renderPokemon(this.state.enemy, 'enemy')}
          </div>
        );
      }
    // Render placeholder text while data loads from server
    } else {
      return (
        <div>
          Loading Pokemon Battle...
        </div>
      );
    }
  }
});
