import React from "react";
import './characterClass';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Liliya = new Character('Liliya', 163, 8),
      liliya = new Character('liliya', 163, 8),
      Lucy = new Character('Lucy', 81, 8),
      damageHistory = []
    };

    this.logDamage = this.logDamage.bind(this);
  }

  
  componentWillMount() {
    this.initializeCharacters();
  }
  

  initializeCharacters() {
    this.Liliya.addShareTarget('liliya', 'Lucy');
    this.liliya.addShareTarget('Liliya', 'Lucy');
    this.Lucy.addShareTarget('Liliya', 'liliya');
  }

  // todo wrap all class manipulation in a class "Do" so we can pass it as one parameter
  // ex. Do.damage()

  applyDamage(amount, target, resist) {
    // todo damage calc
  }

  heal(amount, target) {
    // todo heal
  }

  

  logDamage(string) {
    this.damageHistory.push(string);
  }

  render() {
    return 
    <div>
      <CharacterCard character={this.Liliya} damage={this.applyDamage}/>
      <CharacterCard character={this.liliya} damage={this.applyDamage}/>
      <CharacterCard character={this.Lucy} damage={this.applyDamage}/>
      <CombatLog Logs = {this.damageHistory}/> 
    </div>
  }
}

export default App;