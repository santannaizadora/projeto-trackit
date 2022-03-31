import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
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
    color: #52B6FF;
    font-size: 18px;
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
            <p>Hábitos</p>
            <FooterProgressContainer>
                <FooterProgress>
                    <CircularProgressbar
                        value={percentage}
                        text='Hoje'
                        background='#52B6FF'
                        backgroundPadding={6}
                    />
                </FooterProgress>
            </FooterProgressContainer>

            <p>Histórico</p>

        </FooterContainer>
    )
}