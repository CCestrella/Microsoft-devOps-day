export interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
  position: number;
}

export interface Game {
  id: string;
  cards: Card[];
  moves: number;
  matches: number;
  isCompleted: boolean;
  startTime: string;
  endTime?: string;
  flippedCards: number[];
  gridSize: number;
}

export interface GameMove {
  gameId: string;
  cardPosition: number;
}

export interface GameMoveResult {
  success: boolean;
  message: string;
  game?: Game;
  isMatch: boolean;
  matchedCards: number[];
}