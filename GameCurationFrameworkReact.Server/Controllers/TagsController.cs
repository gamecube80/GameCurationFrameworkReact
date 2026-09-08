using GameCurationFramework.Model;
using GameCurationFrameworkReact.Server.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace GameCurationFrameworkReact.Server.Controllers {
    [ApiController]
    [Route("api/tags")]
    public class TagsController(GameDataService gameDataService): ControllerBase {
        private readonly GameDataService _gameDataService = gameDataService;

        [HttpGet]
        public async Task<List<Tag>> GetTags() {
            return await _gameDataService.GetTagsAsync();
        }

    }
}
