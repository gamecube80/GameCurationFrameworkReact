import './App.css'
import React from 'react'

function App() {
    React.useEffect(() => {
        fetch("/api/tags")
            .then(response => response.json())
            .then(data => setTags(data))
    }, [])

    const [rolledTags, setRolledTags] = React.useState([])

    const games = [
        {
            id: "game-1",
            name: "Sample Game 1",
            price: 19.99,
            userRating: 8.2,
            tags: ["Horror", "Dark"]
        },
        {
            id: "game-2",
            name: "Sample Game 2",
            price: 29.99,
            userRating: 7.5,
            tags: ["Puzzle", "Magic"]
        },
        {
            id: "game-3",
            name: "Sample Game 3",
            price: 0,
            userRating: 9.0,
            tags: ["FPS", "Horror"]
        }
    ]

    function rollTags() {
        function rollTags() {
            const names = tags.map(tag => tag.name)
            const shuffled = shuffle(names)

            setRolledTags(shuffled.slice(0, 3))
        }
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
        const availableTags = tags.filter(x => !rolledTags.includes(x))

        const replacement =
            availableTags[Math.floor(Math.random() * availableTags.length)]

        setRolledTags(
            rolledTags.map(x => x === tag ? replacement : x)
        )
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
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>

                            <tbody>
                                {matchingGames.map(game => (
                                    <tr key={game.id}>
                                        <td>{game.name}</td>
                                        <td>${game.price.toFixed(2)}</td>
                                        <td>{game.userRating ?? "N/A"}</td>
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