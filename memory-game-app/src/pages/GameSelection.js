import React from 'react';
import { Link } from 'react-router-dom';
import './GameSelection.css';

const GameSelection = () => {
  const difficulties = [
    {
      name: 'Easy',
      pairs: 6,
      description: '12 cards (6 pairs)',
      color: 'green',
      icon: '🌸'
    },
    {
      name: 'Medium', 
      pairs: 8,
      description: '16 cards (8 pairs)',
      color: 'orange',
      icon: '🎀'
    },
    {
      name: 'Hard',
      pairs: 10, 
      description: '20 cards (10 pairs)',
      color: 'red',
      icon: '�'
    }
  ];

  return (
    <div className="game-selection">
      <div className="selection-header">
        <h1>🎀 Choose Your Adventure Level</h1>
        <p>Pick your perfect Hello Kitty challenge! 💕</p>
      </div>

      <div className="difficulty-cards">
        {difficulties.map(difficulty => (
          <Link 
            key={difficulty.name}
            to={`/game/${difficulty.name}`}
            className={`difficulty-card ${difficulty.color}`}
          >
            <div className="difficulty-icon">
              {difficulty.icon}
            </div>
            <h2>{difficulty.name}</h2>
            <p className="difficulty-description">{difficulty.description}</p>
            <div className="difficulty-details">
              <span>Perfect for {difficulty.name === 'Easy' ? 'Hello Kitty beginners' : difficulty.name === 'Medium' ? 'cute adventurers' : 'memory masters'}</span>
            </div>
            <div className="play-arrow">▶️</div>
          </Link>
        ))}
      </div>

      <div className="selection-footer">
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default GameSelection;