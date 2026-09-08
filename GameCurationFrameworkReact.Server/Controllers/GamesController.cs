using GameCurationFrameworkReact.Server.Helpers;
using GameCurationFrameworkReact.Server.Model;
using Microsoft.AspNetCore.Mvc;

namespace GameCurationFrameworkReact.Server.Controllers {
    [ApiController]
    [Route("api/games")]
    public class GamesController(GameDataService gameDataService): ControllerBase {
        private readonly GameDataService _gameDataService = gameDataService;

        [HttpGet]
        public async Task<ActionResult<List<Game>>> GetGames() {
            var games = await _gameDataService.GetGamesAsync();
            return Ok(games);
        }

    }
}