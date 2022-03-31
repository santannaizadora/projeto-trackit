import Footer from "../Footer";
import Header from "../Header";

import styled from 'styled-components';
import dayjs from "dayjs";


import "dayjs/locale/pt-br";
import { useEffect, useState } from "react";
import axios from "axios";

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
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const mock = [
        {
            "id": 3,
            "name": "Acordar",
            "done": true,
            "currentSequence": 1,
            "highestSequence": 6
        },
        {
            "id": 4,
            "name": "Comer",
            "done": true,
            "currentSequence": 1,
            "highestSequence": 0
        },
        {
            "id": 5,
            "name": "Dormir",
            "done": false,
            "currentSequence": 1,
            "highestSequence": 5
        }
    ]

    return (
        <>
            <Header />
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
                {data.length === 0 ? (
                    <>
                        {mock.map(habit => (
                            <HabitContainer key={habit.id} done={habit.done}>
                                <div>
                                    <h2>{habit.name}</h2>
                                    <p>Sequencia atual: {habit.currentSequence} dias</p>
                                    <p>Seu recorde: {habit.highestSequence} dias</p>
                                </div>
                                <div>
                                    <ion-icon name="checkbox"></ion-icon>
                                </div>

                            </HabitContainer>
                        ))}
                    </>
                ) : (
                    <h1>Não há nenhum hábito hoje</h1>
                )}
            </Container>
            <Footer />
        </>

    )
}