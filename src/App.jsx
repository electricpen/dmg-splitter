import React from "react";
import CharacterCard from "./CharacterCard";
import CombatLog from "./CombatLog";
import { Character } from "./characterClass";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Liliya: new Character("Liliya", 163, 8),
      liliya: new Character("liliya", 163, 8),
      Lucy: new Character("Lucy", 81, 8),
      damageHistory: []
    };

    this.logDamage = this.logDamage.bind(this);
    this.applyDamage = this.applyDamage.bind(this);
    this.heal = this.heal.bind(this);
  }

  componentWillMount() {
    this.initializeCharacters();
  }

  initializeCharacters() {
    this.state.Liliya.addShareTarget("liliya", "Lucy");
    this.state.liliya.addShareTarget("Liliya", "Lucy");
    this.state.Lucy.addShareTarget("Liliya", "liliya");
  }

  // todo wrap all class manipulation in a class "Do" so we can pass it as one parameter
  // ex. Do.damage()

  applyDamage(amount, target, resist) {
    const split = dmg => {
      return {
        shared: Math.floor(dmg / 2),
        taken: Math.ceil(dmg / 2)
      };
    };
    let clone = Object.assign(
      Object.create(Object.getPrototypeOf(this.state[target])),
      this.state[target]
    );
    if (resist) {
      if (amount <= resist) {
        return;
      }
    } else if (amount <= clone.dr) {
      return;
    } else {
      let painBuddies = [...clone.shareList];
      let damage = { taken: amount };
      for (let buddy of painBuddies) {
        damage = split(damage.taken);
        this.logDamage(`${amount} damage split between ${target} and ${buddy}`);
        this.applyDamage(damage.shared, buddy, resist);
      }
      clone.damage(damage.taken, resist);
      let displayDMG =
        damage.taken > (resist || clone.dr)
          ? damage.taken - (resist || clone.dr)
          : 0;
      console.log(`${clone.name} has taken ${displayDMG} points of damage!`);
      this.logDamage(`${displayDMG} damage taken by ${target}`);
    }
  }

  heal(amount, target) {
    let clone = this.state[target];
    clone.heal(amount);
    this.setState({
      [target]: clone
    });
  }

  applyTHP(amount, target) {
    let clone = { ...this.state[target] };
    clone.setTHP(amount);
    this.setState({
      [target]: clone
    });
  }

  logDamage(string) {
    let temp = [...this.state.damageHistory];
    temp.push(string);
    this.setState({
      damageHistory: temp
    });
  }
  // TODO: pass state manipulation functions to card components
  // TODO: iteratatively render character cards
  render() {
    return (
      <div>
        <CharacterCard
          character={this.state.Liliya}
          damage={this.applyDamage}
        />
        <CharacterCard
          character={this.state.liliya}
          damage={this.applyDamage}
        />
        <CharacterCard character={this.state.Lucy} damage={this.applyDamage} />
        <CombatLog Logs={this.state.damageHistory} />
      </div>
    );
  }
}

export default App;
