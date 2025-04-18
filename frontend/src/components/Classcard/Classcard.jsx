import React from 'react';
import './Classcard.css';

const ClassCard = ({ classTitle, onClick }) => {
  return (
    <div className="class-card" onClick={onClick}>
      {classTitle && <h3>{classTitle}</h3>}
    </div>
  );
};

export default ClassCard;