import React from "react";

const CombatLog = props => (
  <div>
    <ul>{props.Logs.map(line => <li>{line}</li>)}</ul>
  </div>
);

export default CombatLog;
