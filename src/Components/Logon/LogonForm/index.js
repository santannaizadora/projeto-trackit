import axios from 'axios';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { ThreeDots } from "react-loader-spinner";
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 303px;
    height: 45px;    
    background: #52B6FF;
    border-radius: 4.63636px;
    border: none;
    color: #FFFFFF;
    font-size: 20.976px;
    opacity: ${props => !props.disabled ? 1 : 0.5};
`
const Input = styled.input`
    width: 303px;
    height: 45px;
    background:  ${props => !props.disabled ? '#FFFFFF' : '#F2F2F2'};
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 0 10px;
    margin-bottom: 6px;
    font-size: 19.976px;
`
const Error = styled.p`
    color: red;
    font-size: 14px;
    padding-bottom: 10px;
`

export default function LogonForm(props) {
    const { isSubmitting, setIsSubmitting, formData, setFormData } = props;
    const { register, formState: { errors }, handleSubmit } = useForm({
        criteriaMode: "all"
    });
    const navigation = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = () => {
        setIsSubmitting(true);
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', formData)
            .then(res => {
                toast.success('Usuário cadastrado, você será redirecionado para a tela de login', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsSubmitting(false);
                setFormData({
                    email: '',
                    name: '',
                    image: '',
                    password: ''
                });
                setTimeout(() => {
                    navigation('/');
                }, 5000); 
            })
            .catch(err => {
                toast.error(err.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsSubmitting(false);
            });
    }

    return (
        <>
            <ToastContainer />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register("email", {
                        required: "O campo e-mail é obrigatório",
                        pattern: {
                            value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                            message: "Insira um e-mail válido"
                        }
                    })}
                    value={formData.email}
                    type="text"
                    placeholder="email"
                    onChange={handleChange}
                    disabled={isSubmitting}
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <Error className='error-message' key={type}>{message}</Error>
                        ))
                    }
                />
                <Input
                    {...register("password", {
                        required: "O campo senha é obrigatório"
                    })}
                    value={formData.password}
                    type="password"
                    placeholder="senha"
                    onChange={handleChange}
                    disabled={isSubmitting}
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <Error className='error-message' key={type}>{message}</Error>
                        ))
                    }
                />
                <Input
                    {...register("name", {
                        required: "O campo nome é obrigatório",
                        minLength: {
                            value: 3,
                            message: "Insira um nome válido"
                        }
                    })}
                    value={formData.name}
                    type="text"
                    placeholder="nome"
                    onChange={handleChange}
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
                <Input
                    {...register("image", {
                        required: "O campo imagem é obrigatório",
                        pattern: {
                            /* eslint-disable-next-line */
                            value: /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png|gif)/i,
                            message: "Insira uma URL válida (jpg, jpeg, png, gif)"
                        }
                    })}
                    value={formData.image}
                    type="text"
                    placeholder="imagem"
                    onChange={handleChange}
                    disabled={isSubmitting}
                />
                <ErrorMessage
                    errors={errors}
                    name="image"
                    render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <Error className='error-message' key={type}>{message}</Error>
                        ))
                    }
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ?
                        <ThreeDots color="#FFF" height={50} width={50} />
                        :
                        'Cadastrar'
                    }
                </Button>
            </Form>
        </>
    )
}