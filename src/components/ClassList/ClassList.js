import React from 'react';
import { CLASS_LIST } from '../../consts';
import './ClassList.css';

const ClassList = ({ attributes }) => {
    const isClassRequirementsMet = (characterClass) => {
      const requirements = CLASS_LIST[characterClass];
      for (const [attribute, requirement] of Object.entries(requirements)) {
        if (attributes[attribute.toLocaleLowerCase()] < requirement) {
          return false;
        }
      }
      return true;
    };
  
    return (
      <div className="class-list">
        <h3>Classes</h3>
        {Object.keys(CLASS_LIST).map((characterClass) => (
          <div
            key={characterClass}
            className={`class-item ${isClassRequirementsMet(characterClass) ? 'met' : 'not-met'}`}
          >
            <p>{characterClass}</p>
            <p>Requirements:</p>
            <ul>
              {Object.entries(CLASS_LIST[characterClass]).map(([attribute, requirement]) => (
                <li
                  key={attribute}
                >
                  {attribute}: {requirement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  

  export default ClassList;