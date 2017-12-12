import React from "react";
// TODO: add form input fields for THP, damage, and heals
const CharacterCard = props => {
  const handleClick = event => {
    event.preventDefault();
    let resist = event.target.elements.resist.value;
    if (resist === "") {
      resist = undefined;
    }
    props.damage(
      parseInt(event.target.elements.damage.value, 10),
      props.character.name,
      resist
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
          Resists:
          <input type="text" name="resist" />
          Amount:
          <input type="text" name="damage" />
          <input type="submit" value="apply" />
        </form>
      </span>
    </div>
  );
};

export default CharacterCard;
