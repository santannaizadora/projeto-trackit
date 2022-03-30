import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LoginForm from './LoginForm';
import LogoTrackIt from '../assets/img/logo-trackit.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`
const Logo = styled.img`
    width: 154.94px;
`
const LogoText = styled.p`
    font-family: 'Playball';
    font-style: normal;
    font-weight: 400;
    font-size: 68.982px;
    line-height: 86px;
    text-align: center;
    color: #126BA5;
`
const Logon = styled.p`
    padding-top: 25px;
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
`
const Error = styled.p`
    color: #d11507;
    font-size: 14px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: ${props => props.errorMessage !==""? '#ff9e81': "transparent"};
`
export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    console.log(formData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <Container>
            <Logo src={LogoTrackIt} alt="Logo" />
            <LogoText>TrackIt</LogoText>
            <Error errorMessage={errorMessage}>{errorMessage}</Error>
                <LoginForm
                    key='loginForm'
                    isSubmitting={isSubmitting}
                    formData={formData}
                    setFormData={setFormData}
                    setIsSubmitting={setIsSubmitting}
                    setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                />
            <Link to="/cadastro">
                <Logon>Não tem uma conta? Cadastre-se!</Logon>
            </Link>
        </Container>
    );
}