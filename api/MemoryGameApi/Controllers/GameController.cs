using Microsoft.AspNetCore.Mvc;
using MemoryGameApi.Models;
using MemoryGameApi.Services;

namespace MemoryGameApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase
{
    private readonly IGameService _gameService;

    public GameController(IGameService gameService)
    {
        _gameService = gameService;
    }

    [HttpPost("create")]
    public ActionResult<Game> CreateGame([FromQuery] int gridSize = 4)
    {
        try
        {
            var game = _gameService.CreateGame(gridSize);
            return Ok(game);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{gameId}")]
    public ActionResult<Game> GetGame(string gameId)
    {
        var game = _gameService.GetGame(gameId);
        if (game == null)
        {
            return NotFound("Game not found");
        }
        return Ok(game);
    }

    [HttpPost("move")]
    public ActionResult<GameMoveResult> MakeMove([FromBody] GameMove move)
    {
        var result = _gameService.MakeMove(move.GameId, move.CardPosition);
        if (!result.Success)
        {
            return BadRequest(result);
        }
        return Ok(result);
    }

    [HttpPost("{gameId}/reset")]
    public ActionResult<Game> ResetGame(string gameId)
    {
        try
        {
            var game = _gameService.ResetGame(gameId);
            return Ok(game);
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpDelete("{gameId}")]
    public ActionResult DeleteGame(string gameId)
    {
        _gameService.DeleteGame(gameId);
        return NoContent();
    }
}