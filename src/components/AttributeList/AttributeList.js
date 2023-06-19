import React, { useState, useEffect } from "react";
import { ATTRIBUTE_LIST } from "../../consts";
import "./AttributeList.css";
import ClassList from "../ClassList/ClassList";
import SkillList from "../SkillList/SkillList";

const AttributeList = () => {
  const [attributes, setAttributes] = useState({
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  });
  const [attributeModifiers, setAttributeModifiers] = useState({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  });
  const [selectedAttribute, setSelectedAttribute] = useState('');

  useEffect(() => {
    if(attributes[selectedAttribute] > 10)
    setAttributeModifiers((prevAttributeModifiers) => ({
      ...prevAttributeModifiers,
      [selectedAttribute]:  Math.floor((attributes[selectedAttribute] - 10) / 2),
    }));
  }, [attributes, selectedAttribute]);

  useEffect(() => {
    const maximum = Object.values(attributes).reduce((t, n) => t + n)
    if (maximum > 70)
    alert('A character can have up to 70 delegated attribute points')
  }, [attributes, selectedAttribute])

  const incrementAttribute = (attribute) => {
    setSelectedAttribute(attribute);
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: prevAttributes[attribute] + 1,
    }));
  };

  const decrementAttribute = (attribute) => {
    setSelectedAttribute(attribute);
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: prevAttributes[attribute] - 1,
    }));
  };

  const calculateAbilityModifier = (value) => {
    return  Math.floor((value - 10) / 2);
  };

  return (
    <div className="main-container">
      <div className="attribute-list">
        {/* Attribute Section */}
        <div>
          <h3>Attributes</h3>
          {ATTRIBUTE_LIST.map((attribute) => (
            <div key={attribute}>
              <p>
                {attribute}: {attributes[attribute.toLowerCase()]} (Modifier: {calculateAbilityModifier(attributes[attribute.toLowerCase()], attribute.toLowerCase())})
              </p>
              <button
                onClick={() => incrementAttribute(attribute.toLowerCase())}
              >
                +
              </button>
              <button
                onClick={() => decrementAttribute(attribute.toLowerCase())}
              >
                -
              </button>
            </div>
          ))}
        </div>
      </div>
      <ClassList attributes={attributes} />
      <SkillList attributeModifiers={attributeModifiers} />
    </div>
  );
};

export default AttributeList;
