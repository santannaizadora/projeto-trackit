import styled from "styled-components"
import Header from "../Header"
import Footer from "../Footer"
import 'react-calendar/dist/Calendar.css';
import dayjs from "dayjs";

import { useEffect, useState, useContext } from "react";
import TokenContext from '../../contexts/TokenContext';
import { Link } from "react-router-dom";
import Calendar from 'react-calendar'
import axios from "axios";

const HistoricContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #F2F2F2;
    padding: 70px 20px 120px 20px;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
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

const Title = styled.h1`
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
    padding-top: 28px;
    padding-bottom: 17px;
    text-transform: capitalize;
`
const DayFormat = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: black;
    background-color: ${props => props.color};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: auto;
`


export default function Historic() {
    const { token } = useContext(TokenContext);
    const [historic, setHistoric] = useState([]);
    const [dayHistoric, setDayHistoric] = useState([]);

    useEffect(() => {
        if (token) {
            axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    setHistoric(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [token])

    const format = (date) => {
        let color = 'transparent';
        let done = true;
        let habits = historic.filter(day => day.day === dayjs(date).format('DD/MM/YYYY'));
        if (habits.length > 0) {
            habits.map(habit => {
                habit.habits.map(habit => {
                    if (!habit.done) {
                        done = false;
                    }
                })
            })

            if (dayjs(date).format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY')) {
                color = 'transparent';
            } else if (done) {
                color = '228b22';
            } else if (!done) {
                color = '#ff4040';
            }
        }
        return (
            <DayFormat color={color}>
                {dayjs(date).format("DD")}
            </DayFormat>
        )
    }

    const showHabits = (date) => {
        setDayHistoric([]);
        let day = []
        let weekday = {}
        let habits = historic.filter(day => day.day === dayjs(date).format('DD/MM/YYYY'));
        if (habits.length > 0) {
            habits[0].habits.forEach(habit => {
                    day.push({
                        name: habit.name,
                        done: habit.done
                    })
                    weekday.date = dayjs(date).locale('pt-br').format('dddd, DD/MM');
            }
            )
            setDayHistoric([{
                date: weekday.date,
                habits: day
            }]);
        }
    }

    console.log(dayHistoric);

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
                    <HistoricContainer>
                        <Title>Historico</Title>
                        {
                            historic.length === 0
                                ?
                                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                                :
                                <Calendar
                                    calendarType="US"
                                    formatDay={(locale, date) => format(date)}
                                    onClickDay={(date) => showHabits(date)}
                                />
                        }
                        {
                            dayHistoric.length > 0
                                &&
                                <>
                                        {
                                            dayHistoric.map((day, index) => {
                                                return (
                                                    <div key={index}>
                                                    <Title>{day.date}</Title>
                                                    {
                                                        day.habits.map((habit, index) => {
                                                            return (
                                                                <div key={index} >
                                                                    <p>{habit.name}: {habit.done ? 'Feito' : 'Não feito'}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }   
                                                    </div>
                                                )
                                            })
                                        }
                                </>
                        }
                    </HistoricContainer>
            }
            <Footer />
        </>
    )
}