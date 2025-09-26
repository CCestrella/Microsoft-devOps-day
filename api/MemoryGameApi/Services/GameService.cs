using MemoryGameApi.Models;
using System.Collections.Concurrent;

namespace MemoryGameApi.Services;

public class GameService : IGameService
{
    private readonly ConcurrentDictionary<string, Game> _games = new();
    private readonly string[] _symbols = { "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐸", "🐙", "🦋", "🐝", "🐞" };

    public Game CreateGame(int gridSize = 4)
    {
        var game = new Game
        {
            GridSize = gridSize
        };

        var totalCards = gridSize * gridSize;
        var pairsNeeded = totalCards / 2;
        
        if (pairsNeeded > _symbols.Length)
        {
            throw new ArgumentException($"Grid size too large. Maximum supported grid size is {(int)Math.Sqrt(_symbols.Length * 2)}x{(int)Math.Sqrt(_symbols.Length * 2)}");
        }

        // Create pairs of cards
        var cards = new List<Card>();
        for (int i = 0; i < pairsNeeded; i++)
        {
            var symbol = _symbols[i];
            cards.Add(new Card { Id = i * 2, Symbol = symbol, Position = i * 2 });
            cards.Add(new Card { Id = i * 2 + 1, Symbol = symbol, Position = i * 2 + 1 });
        }

        // Shuffle cards
        var random = new Random();
        cards = cards.OrderBy(x => random.Next()).ToList();
        
        // Update positions after shuffle
        for (int i = 0; i < cards.Count; i++)
        {
            cards[i].Position = i;
        }

        game.Cards = cards;
        _games[game.Id] = game;

        return game;
    }

    public Game? GetGame(string gameId)
    {
        _games.TryGetValue(gameId, out var game);
        return game;
    }

    public GameMoveResult MakeMove(string gameId, int cardPosition)
    {
        var game = GetGame(gameId);
        if (game == null)
        {
            return new GameMoveResult
            {
                Success = false,
                Message = "Game not found"
            };
        }

        if (game.IsCompleted)
        {
            return new GameMoveResult
            {
                Success = false,
                Message = "Game is already completed",
                Game = game
            };
        }

        var card = game.Cards.FirstOrDefault(c => c.Position == cardPosition);
        if (card == null)
        {
            return new GameMoveResult
            {
                Success = false,
                Message = "Invalid card position",
                Game = game
            };
        }

        if (card.IsFlipped || card.IsMatched)
        {
            return new GameMoveResult
            {
                Success = false,
                Message = "Card is already flipped or matched",
                Game = game
            };
        }

        // Flip the card
        card.IsFlipped = true;
        game.FlippedCards.Add(cardPosition);

        var result = new GameMoveResult
        {
            Success = true,
            Message = "Card flipped",
            Game = game
        };

        // Check if we have two flipped cards
        if (game.FlippedCards.Count == 2)
        {
            game.Moves++;
            var firstCard = game.Cards.First(c => c.Position == game.FlippedCards[0]);
            var secondCard = game.Cards.First(c => c.Position == game.FlippedCards[1]);

            if (firstCard.Symbol == secondCard.Symbol)
            {
                // Match found
                firstCard.IsMatched = true;
                secondCard.IsMatched = true;
                game.Matches++;
                result.IsMatch = true;
                result.MatchedCards = new List<int> { firstCard.Position, secondCard.Position };
                result.Message = "Match found!";

                // Check if game is completed
                if (game.Cards.All(c => c.IsMatched))
                {
                    game.IsCompleted = true;
                    game.EndTime = DateTime.UtcNow;
                    result.Message = "Congratulations! Game completed!";
                }
            }
            else
            {
                // No match, flip cards back after a delay (handled by frontend)
                firstCard.IsFlipped = false;
                secondCard.IsFlipped = false;
                result.Message = "No match, cards will flip back";
            }

            game.FlippedCards.Clear();
        }

        return result;
    }

    public Game ResetGame(string gameId)
    {
        var existingGame = GetGame(gameId);
        if (existingGame == null)
        {
            throw new ArgumentException("Game not found");
        }

        // Create a new game with the same grid size
        var newGame = CreateGame(existingGame.GridSize);
        
        // Replace the old game with the new one using the same ID
        newGame.Id = gameId;
        _games[gameId] = newGame;

        return newGame;
    }

    public void DeleteGame(string gameId)
    {
        _games.TryRemove(gameId, out _);
    }
}