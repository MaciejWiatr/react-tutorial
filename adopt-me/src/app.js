import React, { useState, lazy, Suspense } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import ThemeContext from "./ThemeContext.jsx";

const Details = lazy(() => import("./Details.jsx"));
const SearchParams = lazy(() => import("./SearchParams.jsx"));

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
                    <Suspense fallback={<h1>Loading route</h1>}>
                        <Router>
                            <SearchParams path="/" />
                            <Details path="/details/:id" />
                        </Router>
                    </Suspense>
                </div>
            </ThemeContext.Provider>
        </React.StrictMode>
    );
};
render(<App />, document.getElementById("root"));
