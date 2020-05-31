import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams.jsx";
import { Router, Link } from "@reach/router";
import Details from "./Details.js";

const App = () => {
    return (
        <React.StrictMode>
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
        </React.StrictMode>
    );
};
render(<App />, document.getElementById("root"));
