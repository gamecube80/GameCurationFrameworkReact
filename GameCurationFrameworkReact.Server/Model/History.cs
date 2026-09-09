namespace GameCurationFrameworkReact.Server.Model {
    public class History {
        public string Id { get; set; } = "";
        public string Type { get; set; } = "history";

        public int Year { get; set; }
        public int Month { get; set; }

        public List<string> Tags { get; set; } = [];
        public List<GcfHistoryGame> Games { get; set; } = [];
    }

    public class GcfHistoryGame {
        public string GameId { get; set; } = "";
        public string Role { get; set; } = "Standard";
        public bool Completed100Percent { get; set; }
    }
}
