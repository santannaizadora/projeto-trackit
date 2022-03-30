import axios from 'axios';
import React, { useState } from 'react';

import styled from 'styled-components';
import LogoTrackIt from '../assets/img/logo-trackit.png';

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
        margin-bottom: 20px;
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

    const Form = styled.form`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `

    const Button = styled.button`
        width: 303px;
        height: 45px;    
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
        color: #FFFFFF;
        font-size: 20.976px;
`
const Input = styled.input`
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 0 10px;
        margin-bottom: 6px;
        font-size: 19.976px;
    `

const InputsLogin = (props) => {
    const { isSubmitting, formData, setFormData } = props;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    

    return (
        <>
            <Input
                value={formData.email}
                type="email"
                placeholder="email"
                name='email'
                onChange={handleChange}
                disabled={isSubmitting}
            />
            <Input
                value={formData.password}
                type="password"
                placeholder="senha"
                name='password'
                onChange={handleChange}
                disabled={isSubmitting}
            />
        </>
    )
}


export default function Login() {

    

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    console.log(formData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setErrorMessage('');

        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', formData)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                setIsSubmitting(false);
            })
            .catch(err => {
                setErrorMessage(err.response.data.message);
                setIsSubmitting(false);

            });

    }
    console.log(errorMessage)


    return (
        <Container>
            <Logo src={LogoTrackIt} alt="Logo" />
            <LogoText>TrackIt</LogoText>
            <Form>
                <InputsLogin
                    key='inputsLogin'
                    isSubmitting={isSubmitting}
                    formData={formData}
                    setFormData={setFormData}
                />
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ?
                        'Carregando...'
                        :
                        'Entrar'}

                </Button>
            </Form>

            <Logon>Não tem uma conta? Cadastre-se!</Logon>
        </Container>
    );
}

