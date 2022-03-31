import Footer from "../Footer";
import Header from "../Header";

import styled from 'styled-components';
import dayjs from "dayjs";

import "dayjs/locale/pt-br";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 70px 20px;
    height: 100vh;
    background-color: #F2F2F2;

    h1{
        padding-top: 20px;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    h1:first-letter {
        text-transform: capitalize;
    }
`

const today = dayjs().locale("pt-br").format("dddd, DD/MM");

export default function Today() {
    return (
        <>
            <Header />
            <Container>

                <h1>{today}</h1>

            </Container>
            <Footer />
        </>

    )
}