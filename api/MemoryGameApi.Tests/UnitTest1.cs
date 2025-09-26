using MemoryGameApi.Services;
using MemoryGameApi.Models;

namespace MemoryGameApi.Tests;

public class GameServiceTests
{
    private readonly GameService _gameService;

    public GameServiceTests()
    {
        _gameService = new GameService();
    }

    [Fact]
    public void CreateGame_ShouldCreateGameWithCorrectNumberOfCards()
    {
        // Arrange
        var gridSize = 4;
        var expectedCardCount = gridSize * gridSize;

        // Act
        var game = _gameService.CreateGame(gridSize);

        // Assert
        Assert.NotNull(game);
        Assert.Equal(expectedCardCount, game.Cards.Count);
        Assert.Equal(gridSize, game.GridSize);
        Assert.False(game.IsCompleted);
        Assert.Equal(0, game.Moves);
        Assert.Equal(0, game.Matches);
    }

    [Fact]
    public void CreateGame_ShouldCreatePairsOfCards()
    {
        // Arrange
        var gridSize = 4;

        // Act
        var game = _gameService.CreateGame(gridSize);

        // Assert
        var symbols = game.Cards.GroupBy(c => c.Symbol);
        Assert.All(symbols, symbolGroup => Assert.Equal(2, symbolGroup.Count()));
    }

    [Fact]
    public void CreateGame_WithLargeGridSize_ShouldThrowArgumentException()
    {
        // Arrange
        var largeGridSize = 10; // Would require 50 pairs, but we only have 16 symbols

        // Act & Assert
        Assert.Throws<ArgumentException>(() => _gameService.CreateGame(largeGridSize));
    }

    [Fact]
    public void GetGame_WithValidId_ShouldReturnGame()
    {
        // Arrange
        var game = _gameService.CreateGame();
        var gameId = game.Id;

        // Act
        var retrievedGame = _gameService.GetGame(gameId);

        // Assert
        Assert.NotNull(retrievedGame);
        Assert.Equal(gameId, retrievedGame.Id);
    }

    [Fact]
    public void GetGame_WithInvalidId_ShouldReturnNull()
    {
        // Arrange
        var invalidId = "invalid-id";

        // Act
        var game = _gameService.GetGame(invalidId);

        // Assert
        Assert.Null(game);
    }

    [Fact]
    public void MakeMove_WithValidPosition_ShouldFlipCard()
    {
        // Arrange
        var game = _gameService.CreateGame();
        var cardPosition = 0;

        // Act
        var result = _gameService.MakeMove(game.Id, cardPosition);

        // Assert
        Assert.True(result.Success);
        Assert.True(game.Cards[cardPosition].IsFlipped);
        Assert.Contains(cardPosition, game.FlippedCards);
    }

    [Fact]
    public void MakeMove_WithInvalidGameId_ShouldReturnFailure()
    {
        // Arrange
        var invalidGameId = "invalid-id";
        var cardPosition = 0;

        // Act
        var result = _gameService.MakeMove(invalidGameId, cardPosition);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Game not found", result.Message);
    }

    [Fact]
    public void MakeMove_WithAlreadyFlippedCard_ShouldReturnFailure()
    {
        // Arrange
        var game = _gameService.CreateGame();
        var cardPosition = 0;
        
        // First move to flip the card
        _gameService.MakeMove(game.Id, cardPosition);

        // Act - try to flip the same card again
        var result = _gameService.MakeMove(game.Id, cardPosition);

        // Assert
        Assert.False(result.Success);
        Assert.Equal("Card is already flipped or matched", result.Message);
    }

    [Fact]
    public void MakeMove_WithTwoMatchingCards_ShouldCreateMatch()
    {
        // Arrange
        var game = _gameService.CreateGame();
        
        // Find two cards with the same symbol
        var firstCard = game.Cards[0];
        var matchingCard = game.Cards.Skip(1).First(c => c.Symbol == firstCard.Symbol);

        // Act
        var firstResult = _gameService.MakeMove(game.Id, firstCard.Position);
        var secondResult = _gameService.MakeMove(game.Id, matchingCard.Position);

        // Assert
        Assert.True(secondResult.IsMatch);
        Assert.True(firstCard.IsMatched);
        Assert.True(matchingCard.IsMatched);
        Assert.Equal(1, game.Matches);
        Assert.Equal(1, game.Moves);
        Assert.Empty(game.FlippedCards);
    }

    [Fact]
    public void ResetGame_WithValidId_ShouldCreateNewGameWithSameId()
    {
        // Arrange
        var originalGame = _gameService.CreateGame();
        var originalId = originalGame.Id;
        
        // Make some moves
        _gameService.MakeMove(originalId, 0);

        // Act
        var resetGame = _gameService.ResetGame(originalId);

        // Assert
        Assert.Equal(originalId, resetGame.Id);
        Assert.Equal(0, resetGame.Moves);
        Assert.Equal(0, resetGame.Matches);
        Assert.False(resetGame.IsCompleted);
        Assert.All(resetGame.Cards, card => Assert.False(card.IsFlipped));
        Assert.All(resetGame.Cards, card => Assert.False(card.IsMatched));
    }

    [Fact]
    public void DeleteGame_ShouldRemoveGameFromMemory()
    {
        // Arrange
        var game = _gameService.CreateGame();
        var gameId = game.Id;

        // Act
        _gameService.DeleteGame(gameId);

        // Assert
        var retrievedGame = _gameService.GetGame(gameId);
        Assert.Null(retrievedGame);
    }
}
