import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { getAllMessagesRoute, sendMessagesRoute } from '../utils/APIRoutes';
import { default as Logout } from '../components/Logout';
import { default as ChatInput } from '../components/ChatInput';
import { v4 as uuidv4 } from 'uuid';

export default function ChatContainer({ currentChat, currentUser, socket }) {

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        if (currentChat) {
            async function fetchData() {
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id
                });
                setMessages(response.data);
            }
            fetchData()
            .catch(console.error);
        }
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        });
        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: currentUser._id,
            message: msg
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-receive', (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) =>[...prev, arrivalMessage]);
    }, [arrivalMessage]); // runs every time there is a new arrival message. 

    // will scroll the chat container down to the new message when a new message comes in. 
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior:'smooth' });
    }, [messages]);

    return (
        <> 
        { currentChat && (
            <Container>
                <div className='chat-header'>
                    <div className='user-details'>
                        <div className='avatar'>
                            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} 
                                alt='avatar' 
                            />
                        </div>
                        <div className='username'>
                            <h3>{currentChat.username}</h3>
                        </div>
                    </div>
                    <Logout />
                </div>
                <div className='chat-messages'>
                    {
                        messages.map((message) => {
                            return (
                                <div ref={scrollRef} key={uuidv4} > 
                                    <div className={`message ${message.fromSelf ? "sent" : "received"}`}>
                                        <div className='content'>
                                            <p>
                                                {message.message}
                                            </p>
                                        </div> 
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <ChatInput handleSendMsg={handleSendMsg} />
            </Container>
        )}
        </>
    )
}

const Container = styled.div`

padding-top: 1rem;
display: grid;
grid-template-rows: 10% 78% 12%;
gap: 0.1rem;
overflow: hidden;
@media screen and (min-width: 360px) and (max-width: 480px) {
    grid-template-columns: 15% 70% 15%;
    display: flex;
    flex-direction: column;
    .chat-messages {
        .message {
            .content {
                max-width: 70%;
            }
        }
    }
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar {
            img {
                height: 3rem;
            }
        }
        .username {
            h3 {
                color: white;
            }
        }
    }
}
.chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
        display: flex;
        align-items: center;
        .content {
            max-width: 40%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
            color: #F2F3F4;
        }
    }
    .sent {
        justify-content: flex-end;
        .content {
            background-color: #343434;
        }
    }
    .received {
        justify-content: flex-start;
        .content {
            background-color: #FFFFFF39;
        }
    }
    &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
}
`;