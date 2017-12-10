import React from "react";

const CombatLog = props => (
  <div>
    <ul>{this.props.CombatLog.map(line => <li>line</li>)}</ul>
  </div>
);

export default CombatLog;
