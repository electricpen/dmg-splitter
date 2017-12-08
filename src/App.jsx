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

  applyDamage(amount, target) {
    // todo damage calc
  }

  logDamage(string) {
    this.damageHistory.push(string);
  }

  render() {
    return 
    <div>
      <CharacterCard character={this.Liliya}/>
      <CharacterCard character={this.liliya}/>
      <CharacterCard character={this.Lucy}/>
      <CombatLog Logs = {this.damageHistory}/> 
    </div>
  }
}

export default App;