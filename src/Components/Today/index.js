import Footer from "../Footer";
import Header from "../Header";

import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #F2F2F2;
`

export default function Today(){
    return(
        <Container>
            <Header/>

            <Footer/>
        </Container>
    )
}