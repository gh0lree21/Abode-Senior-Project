import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { allUsersRoute } from '../utils/APIRoutes';
import { default as Contacts } from '../components/Contacts';
import {default as Welcome } from '../components/Welcome';

function Chat() {

    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);

    useEffect(() => { // reroute to login page
        async function fetchData() {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login');
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
            }
        }
        fetchData();
    }, []);

    useEffect(() => { 
        async function fetchData() {
            if (currentUser) {
                // Check if there is a current user and if that user has set their avatar
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                } else {
                    navigate('/setAvatar');
                }
            }
        }
        fetchData();
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    return (
    <Container>
        <div className='container'>
            <Contacts 
                contacts={contacts} 
                currentUser={currentUser} 
                changeChat={handleChatChange}
                />
            <Welcome 
                currentUser={currentUser} 
            />
        </div>
    </Container>
    );
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
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 360px) and (max-width: 480px) {
        grid-template-columns: 35% 65%;
    }
}
`;
// 360 px x 480 px is responsive for mobile devices
export default Chat;