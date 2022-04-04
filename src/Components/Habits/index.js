import styled from "styled-components"
import Header from "../Header"
import Footer from "../Footer"

import { useEffect, useState, useContext } from "react";
import TokenContext from '../../contexts/TokenContext';
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';

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
    position: relative;
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

    ion-icon{
        font-size: 20px;
        position: absolute;
        right: 11px;
        top: 10px;
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
const HabitForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 340px;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    padding : 13px 15px;
    margin-bottom: 30px;
    position: relative;
    color: #666666;

    input{
        font-family: 'Lexend Deca';
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        font-size: 20px;
    }

    button{
        font-family: 'Lexend Deca';
        width: 84px;
        height: 35px;
        border-radius: 5px;
        border: none;
    }
`

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    padding-top: 10px;
    position: absolute;
    bottom: 15px;
    right: 16px;
`

const Button = styled.button`
    color: ${props => props.isSubmitButton ? "#FFFFFF" : "#52B6FF"};
    background: ${props => props.isSubmitButton ? "#52B6FF" : "#FFFFFF"};
    opacity: ${props => !props.disabled ? 1 : 0.5};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
`
const Error = styled.p`
    color: red;
    font-size: 14px;
    padding-top: 5px;
`
const DaySelected = styled.p`
    color: ${props => props.habitDay.some(day => day === props.day) ? '#FFFFFF' : '#CFCFCF'};
    background: ${props => props.habitDay.some(day => day === props.day) ? '#CFCFCF' : '#FFFFFF'};
`
const DayToSelect = styled.p`
    color: ${props => props.days.some(day => day === props.day) ? '#FFFFFF' : '#CFCFCF'};
    background: ${props => props.days.some(day => day === props.day) ? '#CFCFCF' : '#FFFFFF'};
`

const Input = styled.input`
    background:  ${props => !props.disabled ? '#FFFFFF' : '#F2F2F2'};
`
const DaysToRequest = (props) => {
    const [dayIsSelected, setDayIsSelected] = useState(false);
    const { day, habit, setHabit, isSubmitting } = props
    return (
        <DayToSelect
            day={day.value}
            days={habit.days}
            onClick={() => {
                if (!isSubmitting) {
                    setDayIsSelected(!dayIsSelected)
                    if (!dayIsSelected) {
                        setHabit({
                            ...habit,
                            days: [...habit.days, day.value]
                        })
                    } else {
                        setHabit({
                            ...habit,
                            days: [...habit.days.filter(d => d !== day.value)]
                        })
                    }
                }
            }}
        >{day.label}</DayToSelect>
    )
}


export default function Habits() {
    const { register, formState: { errors }, handleSubmit } = useForm({
        criteriaMode: "all"
    });

    const { token } = useContext(TokenContext);
    const [habits, setHabits] = useState([]);
    const [habit, setHabit] = useState({
        name: "",
        days: []
    });
    const [addHabit, setAddHabit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    console.log(habit.days)

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

    const handleDelete = (id) => {
        window.confirm("Deseja realmente excluir esse hábito?") && axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setHabits(habits.filter(habit => habit.id !== id));
                toast.success('Habito deletado com sucesso!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                toast.error(error, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }

    const onSubmit = () => {
        setIsSubmitting(true);
        if (habit.days.length === 0) {
            setIsSubmitting(false);
            toast.info('Selecione pelo menos um dia para criar o hábito!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, habit, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setHabits([...habits, response.data]);
                    setIsSubmitting(false);
                    setHabit({
                        name: "",
                        days: []
                    });
                    toast.success('Habito criado com sucesso!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .catch(error => {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }
    }
    console.log(habit)
    return (
        <>
            <Header />
            <ToastContainer />
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
                            <button onClick={() => setAddHabit(true)}>+</button>
                        </AddHabit>
                        {
                            addHabit
                            &&
                            <HabitForm>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Input
                                        {...register("name", {
                                            required: "O campo nome é obrigatório",
                                            minLength: {
                                                value: 5,
                                                message: "Insira um nome com pelo menos 5 caracteres"
                                            }
                                        })}
                                        value={habit.name}
                                        type="text"
                                        placeholder="Nome do hábito"
                                        onChange={(e) => setHabit({ ...habit, name: e.target.value })}
                                        disabled={isSubmitting}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="name"
                                        render={({ messages }) =>
                                            messages &&
                                            Object.entries(messages).map(([type, message]) => (
                                                <Error className='error-message' key={type}>{message}</Error>
                                            ))
                                        }
                                    />
                                    <Days>
                                        {
                                            weekDays.map(day => (
                                                <DaysToRequest
                                                    key={day.value}
                                                    habit={habit}
                                                    setHabit={setHabit}
                                                    day={day}
                                                    isSubmitting={isSubmitting}
                                                />
                                            ))
                                        }
                                    </Days>

                                    <Buttons>
                                        <Button isSubmitButton={false} onClick={() => setAddHabit(false)}>Cancelar</Button>
                                        <Button isSubmitButton={true} type="submit" disabled={isSubmitting}>
                                            {
                                                isSubmitting
                                                    ?
                                                    <>
                                                        <ThreeDots color="#FFF" height={50} width={50} />
                                                    </>
                                                    :
                                                    <>
                                                        Salvar
                                                    </>
                                            }
                                        </Button>
                                    </Buttons>
                                </form>


                            </HabitForm>
                        }
                        <div>
                            {
                                habits.length === 0
                                    ?
                                    <NoHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabits>
                                    :
                                    habits.map(habit => (
                                        <HabitContainer key={habit.id}>
                                            <ion-icon onClick={() => handleDelete(habit.id)} name="trash-outline"></ion-icon>
                                            <h1>{habit.name}</h1>
                                            <Days>
                                                {
                                                    weekDays.map(day => (
                                                        <DaySelected habitDay={habit.days} day={day.value} key={day.value}>
                                                            {day.label}
                                                        </DaySelected>
                                                    ))
                                                }
                                            </Days>
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
