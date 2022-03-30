//import React, { useState, useEffect } from 'react';
//import { useForm } from 'react-hook-form';


export default function Logon() {
    /*const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setErrorMessage('');

        axios.post('http://localhost:5000/api/auth/login', formData)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                setIsSubmitting(false);
                window.location.href = '/';
            })
            .catch(err => {
                setErrorMessage(err.response.data.message);
                setIsSubmitting(false);
            });
    }*/

    return (
        <div>
            <h1>Logon</h1>
        </div>
    );
}