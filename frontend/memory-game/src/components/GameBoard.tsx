import React, { useState, useEffect } from 'react';
import { Game } from '../types/Game';
import { GameService } from '../services/GameService';
import Card from './Card';
import './GameBoard.css';

const GameBoard: React.FC = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [gridSize, setGridSize] = useState<number>(4);
  
  const gameService = new GameService();

  useEffect(() => {
    startNewGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startNewGame = async () => {
    setLoading(true);
    setError('');
    try {
      const newGame = await gameService.createGame(gridSize);
      setGame(newGame);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start new game');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = async (position: number) => {
    if (!game || disabled) return;

    setDisabled(true);
    try {
      const result = await gameService.makeMove(game.id, position);
      
      if (result.success && result.game) {
        setGame(result.game);
        
        // If no match and we have 2 flipped cards, flip them back after delay
        if (!result.isMatch && result.game.flippedCards.length === 0) {
          setTimeout(() => {
            setDisabled(false);
          }, 1500);
        } else {
          setDisabled(false);
        }
      } else {
        setError(result.message);
        setDisabled(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to make move');
      setDisabled(false);
    }
  };

  const handleResetGame = async () => {
    if (!game) return;

    setLoading(true);
    setError('');
    try {
      const resetGame = await gameService.resetGame(game.id);
      setGame(resetGame);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset game');
    } finally {
      setLoading(false);
    }
  };

  const handleGridSizeChange = async (newSize: number) => {
    setGridSize(newSize);
    setLoading(true);
    setError('');
    try {
      const newGame = await gameService.createGame(newSize);
      setGame(newGame);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create game with new size');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!game) {
    return (
      <div className="error">
        <p>Failed to load game</p>
        <button onClick={startNewGame}>Try Again</button>
      </div>
    );
  }

  const gridStyle = {
    gridTemplateColumns: `repeat(${game.gridSize}, 1fr)`,
  };

  return (
    <div className="game-board">
      <div className="game-header">
        <h1>Memory Game</h1>
        <div className="game-controls">
          <div className="grid-size-selector">
            <label>Grid Size: </label>
            <select 
              value={gridSize} 
              onChange={(e) => handleGridSizeChange(Number(e.target.value))}
              disabled={loading}
            >
              <option value={2}>2x2</option>
              <option value={4}>4x4</option>
              <option value={6}>6x6</option>
            </select>
          </div>
          <button onClick={handleResetGame} disabled={loading}>
            Reset Game
          </button>
          <button onClick={startNewGame} disabled={loading}>
            New Game
          </button>
        </div>
      </div>

      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Moves:</span>
          <span className="stat-value">{game.moves}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Matches:</span>
          <span className="stat-value">{game.matches}/{game.cards.length / 2}</span>
        </div>
        {game.isCompleted && (
          <div className="completion-message">
            🎉 Congratulations! You completed the game in {game.moves} moves!
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="cards-grid" style={gridStyle}>
        {game.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onCardClick={handleCardClick}
            disabled={disabled || game.isCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;