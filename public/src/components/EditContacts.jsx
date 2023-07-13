import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.svg";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { default as AddContact } from '../components/AddContact';
import { default as DeleteContact } from '../components/DeleteContact';

export default function EditContacts ({ contacts }) {

    // const [contacts, setContacts] = useState([]);
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

    const handleContactChange = (contact) => {
        setCurrentContact(contact);
    };

    return (
        <>
            <Container> 
                <div className="brand">
                    <img src={Logo} alt='logo' />
                </div>    
                <div className='editContactButtons'>
                    <button onClick={handleAddContact}>Add Contact</button>
                    <button onClick={handleDeleteContact}>Remove Contact</button>
                </div>
                { // has addContact or delete contact been clicked?
                    addContact === true ? <AddContact /> 
                    :
                    deleteContact === true ?
                    <DeleteContact 
                        changeContact={handleContactChange}
                        contacts={contacts}
                    /> : <Container />
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
`;