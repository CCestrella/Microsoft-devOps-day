import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';
import { Card as CardType } from '../types/Game';

const mockCard: CardType = {
  id: 1,
  symbol: '🐶',
  isFlipped: false,
  isMatched: false,
  position: 0,
};

describe('Card Component', () => {
  const mockOnCardClick = jest.fn();

  beforeEach(() => {
    mockOnCardClick.mockClear();
  });

  test('renders card with question mark when not flipped', () => {
    render(<Card card={mockCard} onCardClick={mockOnCardClick} disabled={false} />);
    
    const cardElement = screen.getByText('?');
    expect(cardElement).toBeInTheDocument();
  });

  test('renders card symbol when flipped', () => {
    const flippedCard = { ...mockCard, isFlipped: true };
    render(<Card card={flippedCard} onCardClick={mockOnCardClick} disabled={false} />);
    
    const symbolElement = screen.getByText('🐶');
    expect(symbolElement).toBeInTheDocument();
  });

  test('calls onCardClick when clicked and not disabled', () => {
    render(<Card card={mockCard} onCardClick={mockOnCardClick} disabled={false} />);
    
    const cardElement = screen.getByText('?').closest('.card');
    fireEvent.click(cardElement!);
    
    expect(mockOnCardClick).toHaveBeenCalledWith(0);
  });

  test('does not call onCardClick when disabled', () => {
    render(<Card card={mockCard} onCardClick={mockOnCardClick} disabled={true} />);
    
    const cardElement = screen.getByText('?').closest('.card');
    fireEvent.click(cardElement!);
    
    expect(mockOnCardClick).not.toHaveBeenCalled();
  });

  test('does not call onCardClick when card is already flipped', () => {
    const flippedCard = { ...mockCard, isFlipped: true };
    render(<Card card={flippedCard} onCardClick={mockOnCardClick} disabled={false} />);
    
    const cardElement = screen.getByText('🐶').closest('.card');
    fireEvent.click(cardElement!);
    
    expect(mockOnCardClick).not.toHaveBeenCalled();
  });

  test('does not call onCardClick when card is matched', () => {
    const matchedCard = { ...mockCard, isMatched: true };
    render(<Card card={matchedCard} onCardClick={mockOnCardClick} disabled={false} />);
    
    const cardElement = screen.getByText('🐶').closest('.card');
    fireEvent.click(cardElement!);
    
    expect(mockOnCardClick).not.toHaveBeenCalled();
  });

  test('applies correct CSS classes for different states', () => {
    const { rerender } = render(<Card card={mockCard} onCardClick={mockOnCardClick} disabled={false} />);
    
    let cardElement = screen.getByText('?').closest('.card');
    expect(cardElement).not.toHaveClass('flipped');
    expect(cardElement).not.toHaveClass('matched');

    // Test flipped state
    const flippedCard = { ...mockCard, isFlipped: true };
    rerender(<Card card={flippedCard} onCardClick={mockOnCardClick} disabled={false} />);
    
    cardElement = screen.getByText('🐶').closest('.card');
    expect(cardElement).toHaveClass('flipped');

    // Test matched state
    const matchedCard = { ...mockCard, isMatched: true };
    rerender(<Card card={matchedCard} onCardClick={mockOnCardClick} disabled={false} />);
    
    cardElement = screen.getByText('🐶').closest('.card');
    expect(cardElement).toHaveClass('matched');
  });
});