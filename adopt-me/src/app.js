import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams.jsx";
import { Router, Link } from "@reach/router";
import { Provider } from "react-redux";
import Details from "./Details.jsx";
import store from "./store";

const App = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
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
            </Provider>
        </React.StrictMode>
    );
};
render(<App />, document.getElementById("root"));
