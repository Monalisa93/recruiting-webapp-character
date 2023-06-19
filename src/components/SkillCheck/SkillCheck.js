import React, { useState } from "react";
import { SKILL_LIST } from "../../consts";

const SkillCheck = () => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [dcValue, setDcValue] = useState(0);
  const [randomNumber, setRandomNumber] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  const handleDcChange = (event) => {
    setDcValue(Number(event.target.value));
  };

  const handleRoll = () => {
    const min = 1;
    const max = 20;
    const roll = Math.floor(Math.random() * (max - min + 1) + min);
    setRandomNumber(roll);

    if (selectedSkill) {
      const skill = SKILL_LIST.find((s) => s.name === selectedSkill);
      if (skill) {
        const totalValue = roll + skill.attributeModifier;
        setIsSuccess(totalValue >= dcValue);
      }
    }
  };

  return (
    <div>
      <div>
        <label>Skill:</label>
        <select id="skill" value={selectedSkill} onChange={handleSkillChange}>
          <option value="">Select Skill</option>
          {SKILL_LIST.map((skill) => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>DC:</label>
        <input id="dc" type="number" value={dcValue} onChange={handleDcChange} />
      </div>
      <button onClick={handleRoll}>Roll</button>
      {randomNumber !== null && (
        <div>
          <p>Random Number: {randomNumber}</p>
          {isSuccess !== null && <p>{isSuccess ? 'Success' : 'Failure'}</p>}
        </div>
      )}
    </div>
  );
};

export default SkillCheck;

