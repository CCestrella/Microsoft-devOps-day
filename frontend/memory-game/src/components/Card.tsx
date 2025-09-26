import React from 'react';
import { Card as CardType } from '../types/Game';
import './Card.css';

interface CardProps {
  card: CardType;
  onCardClick: (position: number) => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onCardClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onCardClick(card.position);
    }
  };

  return (
    <div
      className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${
        card.isMatched ? 'matched' : ''
      } ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-content">?</div>
        </div>
        <div className="card-back">
          <div className="card-content">{card.symbol}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;