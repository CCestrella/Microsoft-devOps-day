import { Game, GameMove, GameMoveResult } from '../types/Game';

const API_BASE_URL = 'http://localhost:5000/api';

export class GameService {
  async createGame(gridSize: number = 4): Promise<Game> {
    const response = await fetch(`${API_BASE_URL}/game/create?gridSize=${gridSize}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to create game: ${response.statusText}`);
    }

    return response.json();
  }

  async getGame(gameId: string): Promise<Game> {
    const response = await fetch(`${API_BASE_URL}/game/${gameId}`);

    if (!response.ok) {
      throw new Error(`Failed to get game: ${response.statusText}`);
    }

    return response.json();
  }

  async makeMove(gameId: string, cardPosition: number): Promise<GameMoveResult> {
    const gameMove: GameMove = {
      gameId,
      cardPosition,
    };

    const response = await fetch(`${API_BASE_URL}/game/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameMove),
    });

    if (!response.ok) {
      throw new Error(`Failed to make move: ${response.statusText}`);
    }

    return response.json();
  }

  async resetGame(gameId: string): Promise<Game> {
    const response = await fetch(`${API_BASE_URL}/game/${gameId}/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to reset game: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteGame(gameId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/game/${gameId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete game: ${response.statusText}`);
    }
  }
}