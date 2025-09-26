namespace MemoryGameApi.Models;

public class Game
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public List<Card> Cards { get; set; } = new();
    public int Moves { get; set; } = 0;
    public int Matches { get; set; } = 0;
    public bool IsCompleted { get; set; } = false;
    public DateTime StartTime { get; set; } = DateTime.UtcNow;
    public DateTime? EndTime { get; set; }
    public List<int> FlippedCards { get; set; } = new();
    public int GridSize { get; set; } = 4; // 4x4 grid by default
}