import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LogoTrackIt from '../assets/img/logo-trackit.png';
import LogonForm from './LogonForm';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
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
const Login = styled.p`
    padding-top: 30px;
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
    
    a{
        color: #52B6FF;
    }
`
export default function Logon() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        image: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);




    return (
        <Container>
            <Logo src={LogoTrackIt} alt="Logo" />
            <LogoText>TrackIt</LogoText>
            <LogonForm
                formData={formData}
                setFormData={setFormData}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
            />
            <Login>
                <Link to="/">
                    Já tem uma conta? Faça login!
                </Link>
            </Login>
        </Container>
    );
}