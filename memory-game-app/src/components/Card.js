import React from 'react';
import './Card.css';

const Card = ({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick();
    }
  };

  return (
    <div 
      className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-pattern">
            <div className="pattern-dot"></div>
            <div className="pattern-dot"></div>
            <div className="pattern-dot"></div>
            <div className="pattern-dot"></div>
          </div>
          <div className="card-logo">🎀</div>
        </div>
        <div className="card-back">
          <div className="card-emoji">
            {card.emoji}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;