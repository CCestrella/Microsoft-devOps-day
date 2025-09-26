import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the GameService to avoid actual API calls
jest.mock('./services/GameService', () => {
  return {
    GameService: jest.fn().mockImplementation(() => ({
      createGame: jest.fn().mockRejectedValue(new Error('Network error')),
    })),
  };
});

test('renders memory game app', () => {
  render(<App />);
  const loadingElement = screen.getByText(/loading/i);
  expect(loadingElement).toBeInTheDocument();
});
