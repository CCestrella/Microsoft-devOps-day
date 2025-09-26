namespace MemoryGameApi.Models;

public class Card
{
    public int Id { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public bool IsFlipped { get; set; } = false;
    public bool IsMatched { get; set; } = false;
    public int Position { get; set; }
}