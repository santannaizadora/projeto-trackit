import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import { useState } from "react";

import TokenContext from "../../contexts/TokenContext";
import UserContext from "../../contexts/UserContext";
import ProgressContext from "../../contexts/ProgressContext";
import Login from '../Login';
import Logon from '../Logon';
import Today from "../Today";
import Habits from "../Habits";
import Historic from "../Historic";

const Container = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        font-family: 'Lexend Deca', sans-serif;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    
    *{
        box-sizing: border-box;
    }
    `;

export default function App() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({
        name: "",
        image: "",
        habits: []
    });
    const [progress, setProgress] = useState(0);
    
    if (token === "" && localStorage.getItem("token") !== null) {
        setToken(localStorage.getItem("token"));
    }

    if (user.name === "" && localStorage.getItem("userInfos") !== null) {
        setUser({
            ...user,
            name: JSON.parse(localStorage.getItem("userInfos")).name,
            image: JSON.parse(localStorage.getItem("userInfos")).image
        });
    }

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <UserContext.Provider value={{ user, setUser }}>
                <ProgressContext.Provider value={{progress, setProgress}}>
                    <BrowserRouter>
                        <Container />
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/cadastro" element={<Logon />} />
                            <Route path="/hoje" element={<Today />} />
                            <Route path="/habitos" element={<Habits/>} />
                            <Route path="/historico" element={<Historic />} />
                        </Routes>
                    </BrowserRouter>
                </ProgressContext.Provider>
            </UserContext.Provider>
        </TokenContext.Provider>
    );
}