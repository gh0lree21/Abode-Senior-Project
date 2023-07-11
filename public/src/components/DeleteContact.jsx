import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function DeleteContact () {

    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentContact, setCurrentContact] = useState(undefined);


    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleValidation = () => {

    };

    return (
        <>
            <FormContainer>
                <form>
                    <div className='searchBar'>
                        <input
                            type='text'
                            placeholder='Username'
                            name='username'

                        />
                        <button type="submit">Search</button>
                    </div>
                    <div className='searchResults'>
                        { // if the contact can be found in the DB, display it
                            
                            <h2>No results for <span></span></h2>
                        }
                    </div>
                    <button type="submit">Delete</button>
                </form>
            </FormContainer>
        </>
    )
}

const FormContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
padding: 2rem;
img {
    height: 20rem;
}
span {
    color: #4e0eff;
}
form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;

    .searchBar {
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e03ff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #997af0;
            outline: none;
        }
    
    .searchResults {
        padding-top: 1rem;
    }
    }
}

`;