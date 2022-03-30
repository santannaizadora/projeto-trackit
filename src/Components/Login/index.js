import styled from 'styled-components';
import LogoTrackIt from '../assets/img/logo-trackit.png';


export default function Login() {

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
    const Form = styled.form`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
        color: #DBDBDB;
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

    return (
        <Container>
            <Logo src={LogoTrackIt} alt="Logo" />
            <LogoText>TrackIt</LogoText>
            <Form>
                <Input type="text" placeholder="email" autocomplete="on" />
                <Input type="password" placeholder="senha" autocomplete="on" />
                <Button type="submit">Entrar</Button>
            </Form>
            <Logon>Não tem uma conta? Cadastre-se!</Logon>
        </Container>
    );
}