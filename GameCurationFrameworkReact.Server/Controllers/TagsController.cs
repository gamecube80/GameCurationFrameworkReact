using GameCurationFrameworkReact.Server.Helpers;
using GameCurationFrameworkReact.Server.Model;
using Microsoft.AspNetCore.Mvc;

namespace GameCurationFrameworkReact.Server.Controllers {
    [ApiController]
    [Route("api/tags")]
    public class TagsController(GameDataService gameDataService): ControllerBase {
        private readonly GameDataService _gameDataService = gameDataService;

        [HttpGet]
        public async Task<ActionResult<List<Tag>>> GetTags() {
            var tags = await _gameDataService.GetTagsAsync();
            return Ok(tags);
        }

    }
}