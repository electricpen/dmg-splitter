import React from "react";
import CharacterCard from "./CharacterCard";
import CombatLog from "./CombatLog";
// import "./characterClass";
class Character {
  constructor(name, hp, dr) {
    this.name = name;
    this.totalHP = hp;
    this.currentHP = hp;
    this.THP = 0;
    this.dr = dr;
    this.shareList = [];
  }

  setDR(dr) {
    this.dr = dr;
  }

  addShareTarget(name) {
    let list = Array.from(arguments);
    for (name of list) {
      this.shareList.push(name);
    }
  }

  setTHP(amount) {
    if (amount > this.THP) {
      this.THP = amount;
    }
  }

  removeTHP() {
    this.THP = 0;
  }

  heal(amount) {
    if (amount > this.totalHP - this.currentHP) {
      this.currentHP = this.totalHP;
    } else {
      this.currentHP += amount;
    }
  }

  damage(amount, resist) {
    if (resist) {
      amount -= resist;
    } else {
      amount -= this.dr;
    }
    if (this.THP > 0) {
      if (amount < this.THP) {
        this.THP -= amount;
      } else {
        amount -= this.THP;
        this.THP = 0;
      }
    } else {
      this.currentHP -= amount;
    }
  }
}

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
    let clone = { ...this.state[target] };
    if (resist) {
      if (amount <= resist) {
        return;
      }
    } else if (amount <= clone.dr) {
      return;
    } else {
      let painBuddies = [...clone.shareList];
      let damage = {};
      while (painBuddies.length > 0) {
        damage = split(amount);
        this.logDamage(
          `${amount} damage split between ${target} and ${painBuddies[0]}`
        );
        this.applyDamage(damage.shared, painBuddies[0], resist);
        painBuddies.shift();
      }
      clone.damage(damage.taken, resist);
      this.logDamage(
        `${damage.taken - (resist || clone.dr)} damage taken by ${target}`
      );
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
