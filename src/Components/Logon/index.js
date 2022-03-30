import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    text-align: center;
    color: #126BA5;
`

export default function Logon() {
    const [formData, setFormData] = useState({  
        email: '',
        name: '',
        image: '',
        password: ''
    });



    return (
        <div>
            <h1>Logon</h1>
        </div>
    );
}