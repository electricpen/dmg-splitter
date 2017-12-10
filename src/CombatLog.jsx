import React from "react";
// TODO: add bounding div dimensions and scrolling
const CombatLog = props => (
  <div>
    <ul>{props.Logs.map(line => <li>{line}</li>)}</ul>
  </div>
);

export default CombatLog;
