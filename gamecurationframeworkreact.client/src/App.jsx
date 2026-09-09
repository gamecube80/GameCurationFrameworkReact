import './App.css'
import React from 'react'
import Home from './pages/Home'
import About from './pages/About'

function App() {
    const [currentPage, setCurrentPage] = React.useState("home")

    return (
        <>
            <nav className="navTabs">
                <button
                    type="button"
                    className="headerButton"
                    onClick={() => setCurrentPage("home")}
                >
                    Home
                </button>

                <button
                    type="button"
                    className="headerButton"
                    onClick={() => setCurrentPage("about")}
                >
                    About
                </button>
            </nav>

            <section id="spacer"></section>

            {currentPage === "home" && <Home />}
            {currentPage === "about" && <About />}
        </>
    )
}

export default App