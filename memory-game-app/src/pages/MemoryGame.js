import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import './MemoryGame.css';

const MemoryGame = ({ onGameComplete }) => {
  const { difficulty = 'Easy' } = useParams();
  // Game configuration based on difficulty
  const gameConfig = {
    'Easy': { pairs: 6, timeBonus: 100 },
    'Medium': { pairs: 8, timeBonus: 150 },
    'Hard': { pairs: 10, timeBonus: 200 }
  };

  const { pairs, timeBonus } = gameConfig[difficulty];

  // Hello Kitty themed emojis for cards
  const cardEmojis = ['�', '💕', '🌸', '�', '🦄', '🍓', '🧸', '�', '�', '�', '⭐', '💖', '�', '🦋', '🍭'];

  // Game state
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'paused', 'completed'
  const [showCelebration, setShowCelebration] = useState(false);

  // Initialize game
  const initializeGame = useCallback(() => {
    const selectedEmojis = cardEmojis.slice(0, pairs);
    const gameCards = [...selectedEmojis, ...selectedEmojis]
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5); // Shuffle cards

    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setScore(0);
    setGameTime(0);
    setGameStatus('playing');
    setShowCelebration(false);
  }, [pairs]);

  // Initialize game when component mounts or difficulty changes
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (gameStatus === 'playing') {
      interval = setInterval(() => {
        setGameTime(time => time + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStatus]);

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      
      if (firstCard.emoji === secondCard.emoji) {
        // Match found!
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatchedPairs(prev => [...prev, firstCard.emoji]);
          setFlippedCards([]);
          
          // Calculate score bonus for match
          const matchBonus = 100 + (timeBonus / Math.max(gameTime, 1));
          setScore(prevScore => prevScore + Math.round(matchBonus));
        }, 600);
      } else {
        // No match - flip cards back after delay
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
      
      setMoves(prevMoves => prevMoves + 1);
    }
  }, [flippedCards, gameTime, timeBonus]);

  // Check for game completion
  useEffect(() => {
    if (matchedPairs.length === pairs && gameStatus === 'playing') {
      setGameStatus('completed');
      setShowCelebration(true);
      
      // Calculate final score
      const timePenalty = Math.max(0, gameTime - 60) * 2; // Penalty for time over 1 minute
      const movesPenalty = Math.max(0, moves - pairs) * 10; // Penalty for extra moves
      const finalScore = Math.max(100, score - timePenalty - movesPenalty);
      
      setScore(finalScore);

      // Save score to localStorage
      const gameResult = {
        id: Date.now(),
        score: finalScore,
        moves,
        time: formatTime(gameTime),
        difficulty,
        date: new Date().toISOString().split('T')[0]
      };

      const existingScores = JSON.parse(localStorage.getItem('memoryGameScores') || '[]');
      const updatedScores = [...existingScores, gameResult].sort((a, b) => b.score - a.score);
      localStorage.setItem('memoryGameScores', JSON.stringify(updatedScores));

      // Notify parent component
      if (onGameComplete) {
        onGameComplete(gameResult);
      }

      // Hide celebration after 3 seconds
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [matchedPairs.length, pairs, gameStatus, score, gameTime, moves, difficulty, onGameComplete]);

  // Handle card click
  const handleCardClick = (cardId) => {
    if (gameStatus !== 'playing' || flippedCards.length >= 2) return;

    const clickedCard = cards.find(card => card.id === cardId);
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip the card
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId
          ? { ...card, isFlipped: true }
          : card
      )
    );

    // Add to flipped cards
    setFlippedCards(prev => [...prev, clickedCard]);
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Restart game
  const restartGame = () => {
    initializeGame();
  };

  // Pause/Resume game
  const togglePause = () => {
    setGameStatus(prev => prev === 'playing' ? 'paused' : 'playing');
  };

  return (
    <div className="memory-game">
      <div className="game-nav">
        <Link to="/" className="nav-button home-button">
          🏠 Kitty Home
        </Link>
        <Link to="/select" className="nav-button select-button">
          � Change Level
        </Link>
      </div>
      
      <div className="game-header">
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-label">Score</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Moves</span>
            <span className="stat-value">{moves}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Time</span>
            <span className="stat-value">{formatTime(gameTime)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Difficulty</span>
            <span className={`stat-value difficulty-${difficulty.toLowerCase()}`}>
              {difficulty}
            </span>
          </div>
        </div>

        <div className="game-controls">
          <button 
            className="control-button pause-button" 
            onClick={togglePause}
            disabled={gameStatus === 'completed'}
          >
            {gameStatus === 'paused' ? '▶️ Continue' : '⏸️ Pause'}
          </button>
          <button 
            className="control-button restart-button" 
            onClick={restartGame}
          >
            🎀 New Game
          </button>
        </div>
      </div>

      {gameStatus === 'paused' && (
        <div className="game-overlay">
          <div className="pause-message">
            <h2>🎀 Game Paused</h2>
            <p>Hello Kitty is waiting for you! Click to continue 💕</p>
            <button className="resume-large-button" onClick={togglePause}>
              ▶️ Continue Adventure
            </button>
          </div>
        </div>
      )}

      {showCelebration && (
        <div className="celebration-overlay">
          <div className="celebration-content">
            <h1>� Kawaii! You Did It! �</h1>
            <p>Hello Kitty is so proud! You completed the {difficulty} level! 💕</p>
            <div className="final-stats">
              <div>Final Score: <strong>{score}</strong></div>
              <div>Moves: <strong>{moves}</strong></div>
              <div>Time: <strong>{formatTime(gameTime)}</strong></div>
            </div>
          </div>
        </div>
      )}

      <div className={`cards-grid cards-grid-${pairs}`}>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
            disabled={gameStatus !== 'playing'}
          />
        ))}
      </div>

      <div className="game-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(matchedPairs.length / pairs) * 100}%` }}
          ></div>
        </div>
        <span className="progress-text">
          {matchedPairs.length} / {pairs} pairs matched
        </span>
      </div>
    </div>
  );
};

export default MemoryGame;