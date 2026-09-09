using GameCurationFrameworkReact.Server.Helpers;
using GameCurationFrameworkReact.Server.Model;
using Microsoft.AspNetCore.Mvc;

namespace GameCurationFrameworkReact.Server.Controllers {
    [ApiController]
    [Route("api/history")]
    public class HistoryController(GameDataService gameDataService): ControllerBase {
        private readonly GameDataService _gameDataService = gameDataService;

        [HttpGet]
        public async Task<ActionResult<List<History>>> GetHistory() {
            var history = await _gameDataService.GetHistoryAsync();
            return Ok(history);
        }

    }
}