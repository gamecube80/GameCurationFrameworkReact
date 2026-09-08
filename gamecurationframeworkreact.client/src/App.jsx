import './App.css'
import React from 'react'

function App() {
    const [tags, setTags] = React.useState([])
    const [games, setGames] = React.useState([])
    const [rolledTags, setRolledTags] = React.useState([])
    const [sortByTag, setSortByTag] = React.useState([])
    const [sortDescendingByTag, setSortDescendingByTag] = React.useState([])

    React.useEffect(() => {
        fetch("/api/tags")
            .then(response => response.json())
            .then(data => setTags(data))
    }, [])

    React.useEffect(() => {
        fetch("/api/games")
            .then(response => response.json())
            .then(data => setGames(data))
    }, [])

    function rollTags() {
        const names = tags.map(tag => tag.name)
        const shuffled = shuffle(names)

        setRolledTags(shuffled.slice(0, 3))
    }

    function shuffle(array) {
        const shuffled = [...array]

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))

            const temp = shuffled[i]
            shuffled[i] = shuffled[j]
            shuffled[j] = temp
        }

        return shuffled
    }

    function rerollTag(tag) {
        const availableTags = tags
            .map(x => x.name)
            .filter(name => !rolledTags.includes(name))

        const replacement =
            availableTags[Math.floor(Math.random() * availableTags.length)]

        setRolledTags(
            rolledTags.map(x => x === tag ? replacement : x)
        )
    }

    function sortGames(tag, column) {
        if (sortByTag[tag] === column) {
            setSortDescendingByTag({
                ...sortDescendingByTag,
                [tag]: !sortDescendingByTag[tag]
            })
        }
        else {
            setSortByTag({
                ...sortByTag,
                [tag]: column
            })

            setSortDescendingByTag({
                ...sortDescendingByTag,
                [tag]: false
            })
        }
    }

    function getSortArrow(tag, column) {
        if (sortByTag[tag] !== column)
            return ""

        return sortDescendingByTag[tag] ? "▾" : "▴"
    }

    return (
        <>
            <section>
                <div className="welcome">
                </div>

                <div>
                    <h1>Welcome</h1>
                </div>

                <button
                    type="button"
                    className="rollTags"
                    onClick={() => rollTags()}
                >
                    Roll Tags
                </button>
            </section>

            <section id="spacer"></section>

            {rolledTags.map((tag) => {
                const matchingGames = games.filter(game =>
                    game.tags.includes(tag)
                )

                const sortedGames = [...matchingGames].sort((a, b) => {
                    const sortBy = sortByTag[tag]
                    const descending = sortDescendingByTag[tag] ?? false

                    let comparison = 0

                    if (sortBy === "Name") {
                        comparison = a.name.localeCompare(b.name)
                    }
                    else if (sortBy === "Price") {
                        comparison = a.price - b.price
                    }
                    else if (sortBy === "Rating") {
                        comparison = (a.userRating ?? 0) - (b.userRating ?? 0)
                    }

                    return descending ? -comparison : comparison
                })

                return (
                    <div key={tag}>
                        <div>
                            {tag}
                            <button
                                type="button"
                                className="rollTags"
                                onClick={() => rerollTag(tag)}
                                style={{ marginLeft: "10px" }}
                            >
                                Reroll
                            </button>
                        </div>

                        <table className="gameTable">
                            <thead>
                                <tr>
                                    <th>Cover</th>
                                    <th>
                                        <button
                                            type="button"
                                            className="headerButton"
                                            onClick={() => sortGames(tag, "Name")}>
                                            Name {getSortArrow(tag, "Name")}
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            type="button"
                                            className="headerButton"
                                            onClick={() => sortGames(tag, "Price")}>
                                            Price {getSortArrow(tag, "Price")}
                                        </button>
                                    </th>
                                    <th>
                                        <button
                                            type="button"
                                            className="headerButton"
                                            onClick={() => sortGames(tag, "Rating")}>
                                            Rating {getSortArrow(tag, "Rating")}
                                        </button>
                                    </th>
                                    <th>Tags</th>
                                </tr>
                            </thead>

                            <tbody>
                                {sortedGames.map(game => (
                                    <tr key={game.id}>
                                        <td><img src={game.coverArtUrl} /></td>
                                        <td>{game.name}</td>
                                        <td>${game.price.toFixed(2)}</td>
                                        <td>{game.userRating ?? "N/A"}</td>
                                        <td>{[...game.tags].sort().join(", ")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </>
    )
}

export default App