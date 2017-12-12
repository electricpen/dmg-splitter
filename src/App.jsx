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

  async applyDamage(amount, target, resist) {
    const split = dmg => {
      return {
        shared: Math.floor(dmg / 2),
        taken: Math.ceil(dmg / 2)
      };
    };
    let clone = await Object.assign(
      Object.create(Object.getPrototypeOf(this.state[target])),
      this.state[target]
    );
    if (amount <= resist) {
      return;
    } else if (amount <= clone.dr) {
      return;
    } else {
      let painBuddies = [...clone.shareList];
      let damage = { taken: amount };
      for (let buddy of painBuddies) {
        damage = split(damage.taken);
        // await this.logDamage(
        //   `${amount} damage split between ${target} and ${buddy}`
        // );
        await this.applyDamage(damage.shared, buddy, resist);
      }
      await clone.damage(damage.taken, resist);
      let displayDMG =
        damage.taken > (resist || clone.dr)
          ? damage.taken - (resist || clone.dr)
          : 0;
      // console.log(`${clone.name} has taken ${displayDMG} points of damage!`);
      await this.logDamage(`${displayDMG} damage taken by ${target}`);
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

  async logDamage(string) {
    const process = logs => {
      let result = [];
      let compiledLog = {
        Liliya: 0,
        liliya: 0,
        Lucy: 0
      };
      for (let log of logs) {
        let words = log.split(" ");
        const damage = parseInt(words[0], 10);
        const name = words[words.length - 1];
        compiledLog[name] += damage;
      }
      for (let name in compiledLog) {
        result.push(`${compiledLog[name]} damage taken by ${name}`);
      }
      return result;
    };

    let temp = [...this.state.damageHistory];
    temp.push(string);
    temp = await process(temp);
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
