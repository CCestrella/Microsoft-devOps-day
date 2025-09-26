import React, { useState, useEffect } from 'react';
import './ScoresList.css';

const ScoresList = () => {
  const [scores, setScores] = useState([]);

  // Mock data for previous scores - in a real app, this would come from localStorage or an API
  useEffect(() => {
    const mockScores = [
      {
        id: 1,
        score: 2450,
        moves: 24,
        time: '02:15',
        difficulty: 'Easy',
        date: '2024-03-20'
      },
      {
        id: 2,
        score: 3200,
        moves: 32,
        time: '03:42',
        difficulty: 'Medium',
        date: '2024-03-19'
      },
      {
        id: 3,
        score: 1890,
        moves: 18,
        time: '01:58',
        difficulty: 'Easy',
        date: '2024-03-18'
      },
      {
        id: 4,
        score: 4150,
        moves: 41,
        time: '05:20',
        difficulty: 'Hard',
        date: '2024-03-17'
      },
      {
        id: 5,
        score: 2750,
        moves: 28,
        time: '02:55',
        difficulty: 'Medium',
        date: '2024-03-16'
      }
    ];
    
    // Sort by score (highest first)
    const sortedScores = mockScores.sort((a, b) => b.score - a.score);
    setScores(sortedScores);
  }, []);

  const getDifficultyClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'difficulty-easy';
      case 'medium':
        return 'difficulty-medium';
      case 'hard':
        return 'difficulty-hard';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (scores.length === 0) {
    return (
      <div className="scores-empty">
        <p>No previous scores yet. Start playing to see your results here!</p>
      </div>
    );
  }

  return (
    <div className="scores-list-container">
      <div className="scores-header">
        <span className="header-rank">#</span>
        <span className="header-score">Score</span>
        <span className="header-moves">Moves</span>
        <span className="header-time">Time</span>
        <span className="header-difficulty">Difficulty</span>
        <span className="header-date">Date</span>
      </div>
      
      <div className="scores-list">
        {scores.map((score, index) => (
          <div key={score.id} className={`score-item ${index === 0 ? 'best-score' : ''}`}>
            <span className="score-rank">
              {index + 1}
              {index === 0 && <span className="crown">👑</span>}
            </span>
            <span className="score-points">{score.score.toLocaleString()}</span>
            <span className="score-moves">{score.moves}</span>
            <span className="score-time">{score.time}</span>
            <span className={`score-difficulty ${getDifficultyClass(score.difficulty)}`}>
              {score.difficulty}
            </span>
            <span className="score-date">{formatDate(score.date)}</span>
          </div>
        ))}
      </div>

      <div className="scores-stats">
        <div className="stat-item">
          <span className="stat-label">Best Score:</span>
          <span className="stat-value">{scores[0]?.score.toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Games Played:</span>
          <span className="stat-value">{scores.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average Score:</span>
          <span className="stat-value">
            {Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScoresList;