import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import { host, getUserContactsRoute } from '../utils/APIRoutes';
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
    const [width, setWindowWidth] = useState(0);
    const [isChatSelected, setIsChatSelected] = useState(false);

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

    // if there is a change in the contacts, update it. 
    useEffect(() => { 
        async function fetchData() {
            const localStorageUser = await JSON.parse(localStorage.getItem("chat-app-user"));
            // console.log(currentUser.contacts);
            // console.log(localStorageUser.contacts);
            if (currentUser.contacts !== localStorageUser.contacts) { 
                const data = await axios.get(`${getUserContactsRoute}/${currentUser._id}`);
                setContacts(data.data);
                
            }
        }
        fetchData()
        .catch(console.error);
    }, [currentUser]);

    // event listener to keep track of window size for the side bar
    useEffect(() => {
        updateDimensions();

        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        }
    }, []);

    const updateDimensions = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
    }

    const responsive = {
        seperateContactsAndChat: width > 1023
    }

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
        setIsChatSelected(true);
    };

    // callback function so we can know if the edit contacts button has been pushed
    const handleEditContactsButton = () => {
        // Will return the opposite of previous value (true / false)
        setEditContactsSelected(!editContactsSelected);
    };

    return (
    <Container>
        <div className='container' /*onLoad={updateContacts} */>
            {
                responsive.seperateContactsAndChat ? 
                <>
                <Contacts 
                    contacts={contacts} 
                    currentUser={currentUser} 
                    changeChat={handleChatChange}
                    changeEditContacts={handleEditContactsButton} // should return bool
                />        
                    { // If a chat is selected, fill the chat container, otherwise, do the welcome page. 
                        isLoaded && currentChat === undefined && editContactsSelected === false ? 
                        <Welcome currentUser={currentUser} /> 
                        : 
                        editContactsSelected ? 
                        // if edit is selected, fill the chat container with the edit component
                        <EditContacts 
                            contacts={contacts}
                        />
                        :
                        <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
                    
                    }
                </>
                :
                isChatSelected ?    
                <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />                 
                : 
                <>
                    {
                        editContactsSelected ? 
                        <EditContacts
                            contacts={contacts}
                        />
                        :
                        <Contacts 
                            contacts={contacts} 
                            currentUser={currentUser} 
                            changeChat={handleChatChange}
                            changeEditContacts={handleEditContactsButton}
                        />
                    }
                </>
                
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
background-color: #000000;
.container {
    height: 85vh;
    width: 85vw;
    background-color: #1B1B1B;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 360px) and (max-width: 480px) {
        grid-template-columns: 100%;
        height: 100vh;
        width: 100vw;
        Contacts {
            
        }
    }
}
`;
// 360 px x 480 px is responsive for mobile devices
export default Chat;