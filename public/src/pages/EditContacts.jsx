import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { default as Contacts } from '../components/Contacts';

export default function EditContacts () {

    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentContact, setCurrentContact] = useState(undefined);
    // const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => { // redirect to login page if there isn't a user logged in
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login');
        }
    }, []);

    const handleContactChange = (contact) => {
        setCurrentContact(contact);
    }

    return (
        <Container>
            <div className='container'>
                <Contacts
                contacts={contacts}
                currentUser={currentUser}
                changeContact={handleContactChange}
                />

            </div>
        </Container>
    )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container {
    height: 85vh;
    width: 85 vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 
}
`;