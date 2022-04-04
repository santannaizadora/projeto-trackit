import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import UserContext from "../../contexts/UserContext";
import TokenContext from '../../contexts/TokenContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import 'bootstrap/dist/css/bootstrap.min.css';


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

    span {
        color: #FFFFFF;
        font-size: 20px;
    }
`
export default function Header() {
    const { user, setUser } = useContext(UserContext);
    const { setToken } = useContext(TokenContext);
    const { image, name } = user;
    const navigation = useNavigate();

    const handleLogout = () => {
        let answer = window.confirm("Deseja realmente sair?");
        if (answer) {
            localStorage.removeItem("token");
            localStorage.removeItem("userInfos");
            setToken("");
            setUser({
                name: "",
                image: ""
            })
            navigation("/");
        }
    }

    return (
        <HeaderContainer>
            <LogoText>
                <p>TrackIt</p>
            </LogoText>
            <UserInfo>
                <div>
                    {name !== ''
                        &&
                        <>
                            <Dropdown>
                                <DropdownToggle
                                    variant="#126BA5"
                                    id="dropdown-basic"
                                >
                                    <span>Olá, {name}</span>
                                </DropdownToggle>

                                <DropdownMenu>
                                    <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </>
                    }
                </div>

                {image !== '' && <UserImage src={image} alt="User" />}
            </UserInfo>
        </HeaderContainer>
    )

}