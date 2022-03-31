import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from 'react-router-dom'
import 'react-circular-progressbar/dist/styles.css';

const FooterContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 100;
    padding: 0 31px;
    font-size: 18px;

    a {
        color: #52B6FF;
        text-decoration: none;
    }
`
const FooterProgressContainer = styled.div`
    margin-bottom: 40px;
`
const FooterProgress = styled.div`
    width: 91px;
    height: 91px;

    .CircularProgressbar-path {
        stroke: #fff;
    }
    .CircularProgressbar-trail {
        stroke: transparent;
    }
    .CircularProgressbar-text {
        fill: #FFF;
    }
    .CircularProgressbar-background {
        fill: #52B6FF;
    }
`

export default function Footer() {
    const percentage = 66;

    return (
        <FooterContainer>
            <Link to="/habitos">
                <p>Hábitos</p>
            </Link>
            <FooterProgressContainer>
                <Link to="/hoje">
                    <FooterProgress>
                        <CircularProgressbar
                            value={percentage}
                            text='Hoje'
                            background='#52B6FF'
                            backgroundPadding={6}
                        />
                    </FooterProgress>
                </Link>
            </FooterProgressContainer>
            <Link to="/historico">
                <p>Histórico</p>
            </Link>

        </FooterContainer>
    )
}