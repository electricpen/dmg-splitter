import React from "react";
// TODO: add form input fields for THP, damage, and heals
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
