import styled from "styled-components"
import Header from "../Header"
import Footer from "../Footer"

import { useEffect, useState, useContext } from "react";
import TokenContext from '../../contexts/TokenContext';
import { Link } from "react-router-dom";
import axios from "axios";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #F2F2F2;
    padding: 70px 20px 120px 20px;
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
const AddHabit = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    margin: 10px 0 30px 0;
    height: 35px;

    h1{
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

    button{
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.63636px;
        align-items: center;
        border: none;
        color: #FFFFFF;
        font-size: 30px;
    }
`
const NoHabits = styled.p`
    font-size: 18px;
    color: #666666;
`
const HabitContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding : 13px 15px;
    width: 340px;
    min-height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 10px;

    h1{
        font-size: 19.976px;
        color: #666666;
    }
`
const Days = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 240px;
    padding-top: 10px;

    p{
        width: 30px;
        height: 30px;
        font-size:20px;
        border: 1px solid #CFCFCF;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;S
    }
`
const Day = styled.p`
    color: ${props => props.habitDay.some(day => day === props.day) ? '#FFFFFF' : '#CFCFCF'};
    background: ${props => props.habitDay.some(day => day === props.day) ? '#CFCFCF' : '#FFFFFF'};
`

export default function Habits() {
    const { token } = useContext(TokenContext);
    const [habits, setHabits] = useState([]);

    const weekDays = [
        {
            value: 0,
            label: "D"
        },
        {
            value: 1,
            label: "S"
        },
        {
            value: 2,
            label: "T"
        },
        {
            value: 3,
            label: "Q"
        },
        {
            value: 4,
            label: "Q"
        },
        {
            value: 5,
            label: "S"
        },
        {
            value: 6,
            label: "S"
        }
    ]

    useEffect(() => {
        if (token !== '') {
            axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setHabits(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [token]);

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
                        <AddHabit>
                            <h1>Meus hábitos</h1>
                            <button>+</button>
                        </AddHabit>

                        <div>
                            {
                                habits.length === 0
                                    ?
                                    <NoHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabits>
                                    :
                                    habits.map(habit => (
                                        <HabitContainer key={habit.id}>
                                            <h1>{habit.name}</h1>
                                            <Days>
                                                {
                                                    weekDays.map(day => (
                                                        <Day habitDay={habit.days} day={day.value} key={day.value}>
                                                            <p>{day.label}</p>
                                                        </Day>
                                                    ))
                                                }
                                            </Days>
                                            {/*habit.days.map(day => (
                                                <div key={day}>
                                                    <span>{weekDays[day].label}</span>
                                                    <span>{day.value}</span>
                                                </div>
                                            ))*/}

                                        </HabitContainer>
                                    ))
                            }
                        </div>

                    </Container>

            }
            <Footer />
        </>
    )
}
