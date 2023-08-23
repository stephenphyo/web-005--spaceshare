import React, { useState } from 'react';

const Accordion = ({ title, additionalTitle, content }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        className={`text-sm cursor-pointer pt-4 font-semibold`}
        onClick={toggleAccordion}
      >
        {title}{' '}
        <span className={`txt-primary ${isExpanded && 'hover:txt-primary'}`}>
          {additionalTitle}
        </span>
      </div>
      {isExpanded && (
        <div className="p-4 mt-4 text-sm rounded-lg border border-gray-200">
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion;
