using MemoryGameApi.Models;

namespace MemoryGameApi.Services;

public interface IGameService
{
    Game CreateGame(int gridSize = 4);
    Game? GetGame(string gameId);
    GameMoveResult MakeMove(string gameId, int cardPosition);
    Game ResetGame(string gameId);
    void DeleteGame(string gameId);
}