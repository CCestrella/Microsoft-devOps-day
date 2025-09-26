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

test('renders memory game app with error handling', () => {
  render(<App />);
  
  // Should render the error state when API fails
  const errorElement = screen.getByText(/failed to load game/i);
  expect(errorElement).toBeInTheDocument();
  
  const tryAgainButton = screen.getByText(/try again/i);
  expect(tryAgainButton).toBeInTheDocument();
});
