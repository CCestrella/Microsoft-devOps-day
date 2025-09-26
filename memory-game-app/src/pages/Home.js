import React from 'react';
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
          <button className="play-button">
            Start New Game
          </button>
          <button className="continue-button" disabled>
            Continue Game
          </button>
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