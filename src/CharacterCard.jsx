import React from "react";

const CharacterCard = props => (
  <div>
    <span>{props.character.name + " "}</span>
    <span>
      {props.character.currentHP + " "} / {" " + props.character.totalHP + "  "}
    </span>
    <span>THP: {" " + props.character.THP}</span>
  </div>
);

export default CharacterCard;
