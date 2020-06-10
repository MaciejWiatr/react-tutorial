import React, { useState } from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";
import colors from "./colors.jsx";

const spin = keyframes`
    to{
        transform: rotate(360deg)
    }
`;

const NavBar = () => {
    const [padding, setPadding] = useState(15);
    return (
        <header
            css={css`
                background-color: ${colors.secondary};
                padding: ${padding}px;
            `}
        >
            <Link to="/">Adopt me!</Link>
            <span
                css={css`
                    font-size: 60px;
                    display: inline-block;

                    animation: ${spin} 1s linear infinite;
                    &:hover {
                        text-decoration: underline;
                        animation: ${spin} 1s linear infinite reverse;
                    }
                `}
                aria-label="logo"
                role="img"
            >
                🐩
            </span>
        </header>
    );
};

export default NavBar;
