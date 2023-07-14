import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { Link , useNavigate } from 'react-router-dom';
import { loginRoute } from '../utils/APIRoutes';



function Login () {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    // This redirects the user to the home '/' or 'chat' page if there is a user saved in 
    // local storage.  
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()) {
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            };
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/");
            };
        };
    };

    const handleValidation = () => {
        const { password, username } = values;
        if (password === "") {
            toast.error("Username and Password is required.", toastOptions);
            return false;
        } else if (username.length === "") {
            toast.error("Username and Password is required.", toastOptions);
            return false;
        } 
        return true;
    };
    const handleChange = (event) => {
            setValues({...values, [event.target.name]:event.target.value});
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>myabode</h1>
                    </div>
                    <input 
                        type="text" 
                        placeholder='Username' 
                        name='username' 
                        onChange={(e) => handleChange(e)} 
                        min="3"
                    />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        name='password' 
                        onChange={(e) => handleChange(e)} 
                    />
                    <button type="submit">Log In</button>
                    <span>
                        Don't have an account? <Link to="/register">Register</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #000000;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: #ACE1AF;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap:2rem;
        background-color: #1B1B1B;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #F2F3F4;
            border-radius: 0.4rem;
            color: #ACE1AF;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #ACE1AF;
                outline: none;
            }
        }
        button {
            background-color: #ACE1AF;
            color: #1B1B1B;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #F2F3F4;
            }
        }
        span {
            color: #F2F3F4;
            text-transform: uppercase;
            a {
                color: #686868;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;

export default Login;