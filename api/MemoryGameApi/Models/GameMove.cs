namespace MemoryGameApi.Models;

public class GameMove
{
    public string GameId { get; set; } = string.Empty;
    public int CardPosition { get; set; }
}

public class GameMoveResult
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public Game? Game { get; set; }
    public bool IsMatch { get; set; }
    public List<int> MatchedCards { get; set; } = new();
}