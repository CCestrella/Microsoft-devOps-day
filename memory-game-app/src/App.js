import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MemoryGame from './pages/MemoryGame';
import GameSelection from './pages/GameSelection';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select" element={<GameSelection />} />
          <Route path="/game/:difficulty" element={<MemoryGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;