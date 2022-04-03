import styled from "styled-components"
import Header from "../Header"
import Footer from "../Footer"

import { useEffect, useState, useContext } from "react";
import TokenContext from '../../contexts/TokenContext';
import { Link } from "react-router-dom";


const HistoricContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #F2F2F2;
    padding: 70px 20px 120px 20px;
`
const NotLoggued = styled.div`
    font-size: 17px;
    padding: 70px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #52B6FF;
    height: 100vh;

    a{
        color: #52B6FF;
    }
`

export default function Historic() {
    const { token } = useContext(TokenContext);
    return (
        <>
            <Header />
            {
                (token === '')
                    ?
                    <NotLoggued>
                        <p>Nenhum usuário logado. Faça <Link to='/'>Login</Link> ou <Link to='/cadastro'>Cadastre-se</Link></p>
                    </NotLoggued>

                    :
                    <HistoricContainer>
                        <h1>Historic</h1>
                        <p>Aqui você pode criar e gerenciar seus hábitos.</p>
                    </HistoricContainer>

            }
            <Footer />
        </>
    )
}