import React from 'react';
import { Link } from 'react-router-dom';
import ScoresList from '../components/ScoresList';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="game-title">🧠 Memory Game</h1>
        <p className="game-subtitle">Test your memory skills and beat your previous scores!</p>
      </header>

      <main className="home-main">
        <section className="game-actions">
          <Link to="/select" className="play-button">
            🎮 Start New Game
          </Link>
          <Link to="/game/Easy" className="quick-play-button">
            ⚡ Quick Play (Easy)
          </Link>
        </section>

        <section className="scores-section">
          <h2>Previous Scores</h2>
          <ScoresList />
        </section>
      </main>

      <footer className="home-footer">
        <p>Challenge yourself and improve your memory!</p>
      </footer>
    </div>
  );
};

export default Home;