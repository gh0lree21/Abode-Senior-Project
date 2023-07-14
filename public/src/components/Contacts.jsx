import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';

import EditContactsButton from './EditContactsButton';

function Contacts({contacts, currentUser, changeChat, changeEditContacts }) {
    const [currentUserName, setCurrentUserName] = useState(undefined); // initially we won't know the user name, we'll need to get it
    const [currentUserImage, setCurrentUserImage] = useState(undefined); // initially we won't know the user image, we'll need to get it. 
    const [currentSelected, setCurrentSelected] = useState(undefined); // no chats will be selected initially
    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    return <>
    {
        currentUserImage && currentUserName && (
            <Container>
                <div className='contactsHeader'>
                    <div className='brand'>
                        <img src={Logo} alt='logo' />
                        <h3>myabode</h3>
                    </div>
                    <div className='editContacts'>
                        <EditContactsButton 
                            changeEditContacts={changeEditContacts}
                        />
                    </div>
                </div>
                <div className='contacts'>
                    {
                        contacts != null ? contacts.map((contact, index) => {
                            return (
                                <div className={`contact ${
                                    index === currentSelected ? 'selected' : ''
                                }`} 
                                key={index} 
                                onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className='avatar'>
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} 
                                        alt='avatar' 
                                        />
                                    </div>
                                    <div className='username'>
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })
                        :
                        <Container />
                    } 
                </div>
                <div className='current-user'>
                    <div className='avatar'>
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} 
                        alt='avatar' 
                        />
                    </div>
                    <div className='username'>
                        <h2>{currentUserName}</h2>
                    </div>
                </div>
            </Container>
        )
    }
    </>
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #1A1110;
@media screen and (min-width: 360px) and (max-width: 480px) {
    grid-row: 100%;
}
.contactsHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    padding: 1.3rem;
    gap: 4rem;
    .editContacts {
        p {
            color: #F2F3F4;
        }
    }
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img {
            height: 2rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }

}
.contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .contact {
        display: flex;
        background-color: #ffffff39;
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        gap: 1rem;
        align-items: center;
        transition: 0.5s ease-in-out;
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
    .selected {
        background-color: #9F8170;
    }
}
.current-user {
    background-color: #010B13;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
        img {
            height: 3rem;
            max-inline-size: 100%;
        }
    }
    .username {
        h2 {
            color: white;
        }
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
        gap: 0.3rem;
        display: none;
        .username {
            h2 {
                font-size: 1rem;
            }
        }
        .avatar {
            img {
                1rem;
            }
        }
    }
}
`;

export default Contacts;