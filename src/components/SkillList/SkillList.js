import React, { useState, useEffect } from "react";
import { SKILL_LIST } from "../../consts";
import "./SkillList.css";

const SkillList = ({ attributeModifiers }) => {
  const [skillPoints, setSkillPoints] = useState({});

  useEffect(() => {
    const initialPoints = SKILL_LIST.reduce((points, skill) => {
      points[skill.name] = 0;
      return points;
    }, {});
    setSkillPoints(initialPoints);
  }, []);

  const handlePointChange = (skillName, value) => {
    setSkillPoints((prevSkillPoints) => ({
      ...prevSkillPoints,
      [skillName]: value,
    }));
  };

  const calculateTotalSkillValue = (skillName) => {
    const points = skillPoints[skillName] || 0;
    const attributeModifier =
      attributeModifiers[
        SKILL_LIST.find((skill) => skill.name === skillName).attributeModifier.toLowerCase()
      ];
    return points + attributeModifier;
  };

  return (
    <div className="skill-list">
      <h3>Skills</h3>
      {SKILL_LIST.map((skill) => {
        const { name, attributeModifier } = skill;
        const skillPointsValue = skillPoints[name];

        return (
          <div key={name}>
            <p>
              {name}: {skillPoints[name]} (Modifier {attributeModifier}:{" "}
              {attributeModifiers[attributeModifier.toLowerCase()]})
              <button
                onClick={() => handlePointChange(name, skillPointsValue + 1)}
              >
                +
              </button>
              <button
                onClick={() => handlePointChange(name, skillPointsValue - 1)}
              >
                -
              </button>
              Total: {calculateTotalSkillValue(name)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SkillList;
