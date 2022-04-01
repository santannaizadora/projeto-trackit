import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import styled from 'styled-components';

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 100;
    padding: 0 20px;
`
const UserImage = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 50%;
    margin-left: 10px;
`
const LogoText = styled.div`
    font-size: 38.982px;
    color: #FFFFFF;
    font-family: 'Playball';
`
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    color: #FFFFFF;
    font-size: 20px;
`
export default function Header() {
    const { user } = useContext(UserContext);
    const { image, name } = user;

    return (
        <HeaderContainer>
            <LogoText>
                <p>TrackIt</p>
            </LogoText>
            <UserInfo>
                {name!=='' && <p>Olá, {name}</p>}
                {image!=='' ? <UserImage src={image} alt="User"/>:<></>}
            </UserInfo>
        </HeaderContainer>
    )

}