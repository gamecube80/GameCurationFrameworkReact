import React from 'react'

function History() {
    const [historyData, setHistoryData] = React.useState([]);
    const [games, setGames] = React.useState([]);
    const sortedHistory = [...historyData].sort((a, b) => {
        if (a.year !== b.year) {
            return b.year - a.year
        }

        return b.month - a.month
    })

    React.useEffect(() => {
        fetch("/api/history")
            .then(response => response.json())
            .then(data => setHistoryData(data));
    }, []);

    React.useEffect(() => {
        fetch("/api/games")
            .then(response => response.json())
            .then(data => setGames(data));
    }, []);

    function getMonthName(monthNumber) {
        return new Date(2000, monthNumber - 1).toLocaleString(
            "en-US",
            { month: "long" }
        )
    }

    return (
        <>
            <section>
                <div className="history">
                    <h1>Past GCF Months</h1>
                </div>
            </section>

            <section id="spacer"></section>

            {sortedHistory.map((month) => (
                <section className="historyMonth" key={month.id}>
                    <h2>{getMonthName(month.month)} {month.year}</h2>

                        <div className="historyGameGrid">
                            {month.games.map((historyGame) => {
                                const game = games.find(g => g.id === historyGame.gameId)

                                if (!game)
                                    return null

                                return (
                                    <div className="historyGameCard" key={historyGame.gameId}>
                                        <img
                                            src={game.coverArtUrl}
                                            alt={game.name}
                                            className="historyGameImage"
                                        />

                                        <div className="historyGameContent">
                                        <h3>{game.name}</h3>

                                        <div className="price">
                                            ${game.price.toFixed(2)}
                                        </div>

                                        <div className="rating">
                                            Rating: {game.userRating ?? "N/A"}
                                        </div>

                                        <div className="tags">
                                            {[...game.tags].sort().join(", ")}
                                        </div>

                                        {historyGame.completed100Percent && (
                                            <div className="completed">
                                                ✓ 100% Completed
                                            </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                ))}

        </>
    )
}

export default History