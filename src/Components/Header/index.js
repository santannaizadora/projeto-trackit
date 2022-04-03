import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import UserContext from "../../contexts/UserContext";
import TokenContext from '../../contexts/TokenContext';

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

    div{
        text-align: right;
    }
`
const Button = styled.button`
    display: flex;
    background: transparent;
    border: none;
    color: #FFFFFF;
    font-size: 20px;
    cursor: pointer;
`
export default function Header() {
    const { user, setUser } = useContext(UserContext);
    const { setToken } = useContext(TokenContext);
    const { image, name } = user;
    const navigation = useNavigate();
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(1);

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
                                    <Button {...buttonProps}>Olá, {name}</Button>
                                    {(isOpen && <div role='menu'>
                                        <a {...itemProps[0]} onClick={handleLogout}>Sair</a>
                                    </div>)}
                                </>
                            }
                        </div>

                        {image !== '' && <UserImage src={image} alt="User" />}
                    </UserInfo>
                </HeaderContainer>
            )

        }