import React, { useState } from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams.jsx";
import { Router } from "@reach/router";
import Details from "./Details.jsx";
import ThemeContext from "./ThemeContext.jsx";
import NavBar from "./Navbar.jsx";

const App = () => {
    const themeHook = useState("darkblue");
    return (
        <React.StrictMode>
            <ThemeContext.Provider value={themeHook}>
                <div>
                    <NavBar></NavBar>
                    <Router>
                        <SearchParams path="/" />
                        <Details path="/details/:id" />
                    </Router>
                </div>
            </ThemeContext.Provider>
        </React.StrictMode>
    );
};
render(<App />, document.getElementById("root"));
