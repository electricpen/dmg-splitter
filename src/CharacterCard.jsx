import React from "react";
// TODO: add form input fields for THP, damage, and heals
const CharacterCard = props => {
  const handleClick = event => {
    event.preventDefault();
    props.damage(
      parseInt(event.target.elements.damage.value, 10),
      props.character.name
    );
  };

  return (
    <div>
      <span>{props.character.name + " "}</span>
      <span>
        {props.character.currentHP + " "} /{" "}
        {" " + props.character.totalHP + "  "}
      </span>
      <span>THP: {" " + props.character.THP}</span>
      <span>
        <form onSubmit={handleClick}>
          Amount:
          <input type="text" name="damage" />
          <input type="submit" value="apply" />
        </form>
      </span>
    </div>
  );
};

export default CharacterCard;
