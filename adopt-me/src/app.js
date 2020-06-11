import React, { useState } from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams.jsx";
import { Router, Link } from "@reach/router";
import Details from "./Details.jsx";
import ThemeContext from "./ThemeContext.jsx";

const App = () => {
    const themeHook = useState("darkblue");
    return (
        <React.StrictMode>
            <ThemeContext.Provider value={themeHook}>
                <div>
                    <header>
                        <Link to="/">
                            <h1 id="something-important">Adopt me!</h1>
                        </Link>
                    </header>
                    <Router>
                        <SearchParams path="/" />
                        <Details path="/details/:id" />
                    </Router>
                </div>
            </ThemeContext.Provider>
        </React.StrictMode>
    );
};
// render(<App />, document.getElementById("root"));

export default App;
