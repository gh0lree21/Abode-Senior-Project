import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { default as AddContact } from '../components/AddContact';
import { default as DeleteContact } from '../components/DeleteContact';

export default function EditContacts () {

    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentContact, setCurrentContact] = useState(undefined);
    const [addContact, setAddContact] = useState(false);
    const [deleteContact, setDeleteContact] = useState(false);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    const handleAddContact = () => {
        setAddContact(true);
        setDeleteContact(false);
    };

    const handleDeleteContact = () => {
        setDeleteContact(true);
        setAddContact(false);
    };

    return (
        <>
            <Container> 
                <div className="brand">
                    <h1>logo</h1>
                </div>    
                <div className='editContactButtons'>
                    <button onClick={handleAddContact}>Add Contact</button>
                    <button onClick={handleDeleteContact}>Remove Contact</button>
                </div>
                { // has addContact or delete contact been clicked?
                    addContact === true ? <AddContact /> 
                    :
                    deleteContact === true ?
                    <DeleteContact /> : <Container />
                }
            </Container>
        </>
    )
}

const Container = styled.div`
display: flex;
justify-content: top;
align-items: center;
flex-direction: column;
color: white;
gap: 1rem;
padding: 4rem;
.brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
        height: 5rem;
    }
    h1 {
        color: white;
        text-transform: uppercase;
    }
}
.editContactButtons {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
        background-color: #4e03ff;
    }
`;