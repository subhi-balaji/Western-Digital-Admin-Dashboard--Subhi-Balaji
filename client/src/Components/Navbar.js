import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js";

export default function Navbar() {
    let history = useHistory();
    let location = useLocation();

    const [theme, setTheme] = useState("light");
    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    const handleLogout = () => {
        sessionStorage.clear();
        history.push('/')
    }

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyles />
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <div className="navbar-brand">WDC</div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                {(sessionStorage.getItem('token')) ? <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Dashboard</Link>
                                </li> : <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>}

                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                                </li>
                            </ul>

                            <button onClick={() => themeToggler()} style={{ marginRight: "5px" }} type="button" className="btn btn-primary">Toggle Theme</button>

                            {(sessionStorage.getItem('token')) ? <form className="d-flex">
                                <button onClick={handleLogout} type="button" className="btn btn-primary">Logout</button>
                            </form> : ""}
                        </div>
                    </div>
                </nav>
            </div>
        </ThemeProvider>
    )
}

