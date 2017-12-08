import React from "react";
import './characterClass';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Liliya = new Character('Liliya', 163, 8),
      liliya = new Character('liliya', 163, 8),
      Lucy = new Character('Lucy', 81, 8),
    };
  }

  render() {
    return 
    <div>
      <PlayerCard />
      <PlayerCard />
      <PlayerCard />
      <CombatLog />
    </div>
  }
}

export default App;

