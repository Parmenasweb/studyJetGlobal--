import React from "react";

const QuickFacts = ({ quickFacts }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
      {quickFacts.map((fact, index) => (
        <div key={index} className="flex items-center">
          <fact.icon className="mr-2" />
          <span>{fact.text}</span>
        </div>
      ))}
    </div>
  );
};

export default QuickFacts;
