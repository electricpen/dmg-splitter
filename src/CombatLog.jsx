import React from "react";
// TODO: add bounding div dimensions and scrolling
const CombatLog = props => (
  <div>
    <ul>{props.Logs.map((line, index) => <li key={index}>{line}</li>)}</ul>
  </div>
);

export default CombatLog;
