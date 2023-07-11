import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import { allUsersRoute, host, getUserContactsRoute } from '../utils/APIRoutes';
import { default as Contacts } from '../components/Contacts';
import { default as Welcome } from '../components/Welcome';
import { default as ChatContainer } from '../components/ChatContainer';
import { default as EditContacts } from '../components/EditContacts';
import { BiSolidSticker } from 'react-icons/bi';

function Chat() {

    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [editContactsSelected, setEditContactsSelected] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => { // reroute to login page
        async function fetchData() {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login');
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
                setIsLoaded(true);
            }
        }
        fetchData()
        .catch(console.error);
    }, []);

    // Connect the socket when current User changes
    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit('add-user', currentUser._id);
        }
    }, [currentUser]);

    // Check if there is a current user and if that user has set their avatar
    useEffect(() => { 
        async function fetchData() {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${getUserContactsRoute}/${currentUser._id}`);
                    setContacts(data.data);
                } else {
                    navigate('/setAvatar');
                }
            }
        }
        fetchData()
        .catch(console.error);
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
            {/* { // If a chat is selected, fill the chat container, otherwise, do the welcome page. 
                isLoaded && currentChat === undefined ? 
                <Welcome currentUser={currentUser} /> 
                : 
                <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
            } */}
            { // if edit is selected, fill the chat container with the edit component
                <EditContacts />
            }
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