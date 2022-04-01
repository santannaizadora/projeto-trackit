import styled from 'styled-components';
import axios from "axios";
import dayjs from "dayjs";

import "dayjs/locale/pt-br";

import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import TokenContext from '../../contexts/TokenContext';
import ProgressContext from '../../contexts/ProgressContext';
import Footer from "../Footer";
import Header from "../Header";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 70px 20px 120px 20px;
    min-height: 100vh;
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
const NotLoggued = styled.div`
    font-size: 17px;
    padding: 70px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #52B6FF;
    height: 100vh;

    a{
        color: #52B6FF;
    }
`

const HabitContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    min-height: 94px;
    width: 340px;
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 13px 15px;

    h2{
        font-size: 19.976px;
        color: #666666;
        margin-bottom: 7px;
    }

    p{
        font-size: 12.976px;
        color: #666666;
        margin-bottom: 3px;
    }
    ion-icon{
        font-size: 69px;
        color: ${props => props.done ? '#8FC549' : ' #EBEBEB'};
`
const today = dayjs().locale("pt-br").format("dddd, DD/MM");

export default function Today() {
    const [data, setData] = useState([]);
    const {progress, setProgress} = useContext(ProgressContext);
    const { token } = useContext(TokenContext);
    useEffect(() => {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            calculateProgress();
    }, [token]);

    const calculateProgress = () => {
        if(data.length !== 0){
            setProgress( data.filter(habit => habit.done).length / data.length * 100);
        }
    }

    console.log(data);
    

    const handleClickDone = (id) => {
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,{}, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                setData(data.map(habit => habit.id === id ? { ...habit, done: !habit.done } : habit));
                
            })
            .catch(error => {
                console.log(error);
            })
            calculateProgress();
    }

    const handleClickUndone = (id) => {
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(() => {
                setData(data.map(habit => habit.id === id ? { ...habit, done: !habit.done } : habit));
            })
            .catch(error => {
                console.log(error);
            })
            calculateProgress();
    }

console.log(progress)
    return (
        <>
            <Header />
            {
                (token === '')
                    ?
                    <NotLoggued>
                        <p>Nenhum usuário logado. Faça <Link to='/'>Login</Link> ou <Link to='/cadastro'>Cadastre-se</Link></p>
                    </NotLoggued>

                    :
                    <Container>
                        <h1>{today}</h1>
                        <h2>
                            {
                                progress === 0
                                    ?
                                    'Nenhum hábito concluído ainda'
                                    :
                                    `${progress}% dos hábitos concluídos`
                            }
                        </h2>
                        {data.length > 0 ? (
                            <>
                                {data.map(habit => (
                                    <HabitContainer key={habit.id} done={habit.done}>
                                        <div>
                                            <h2>{habit.name}</h2>
                                            <p>Sequencia atual: {habit.currentSequence} dias</p>
                                            <p>Seu recorde: {habit.highestSequence} dias</p>
                                        </div>
                                        <div onClick={
                                            habit.done ? () => handleClickUndone(habit.id) : () => handleClickDone(habit.id)
                                        }>
                                            <ion-icon name="checkbox"></ion-icon>
                                        </div>
                                    </HabitContainer>
                                ))}
                            </>
                        ) : (
                            <h1>Não há nenhum hábito hoje</h1>
                        )}
                    </Container>
            }
            <Footer />
        </>

    )
}