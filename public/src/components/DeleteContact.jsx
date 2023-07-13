import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { removeContactRoute } from '../utils/APIRoutes';

export default function DeleteContact ({ contacts, changeContact }) {

    const [currentContact, setCurrentContact] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined); // no chats will be selected initially

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    const removeContact = async () => {
        if (currentContact === undefined) {
            toast.error("No contact selected", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${removeContactRoute}/${user._id}`, {
                contact: currentContact
            });

            if (data.isDeleted) {
                user.contacts = data.userContacts.contacts;

                localStorage.setItem("chat-app-user", JSON.stringify(user));
                toast.info("Contact was deleted", toastOptions);
            } else {
                toast.error(data.msg, toastOptions);
            }
            
        }
    };

    const changeCurrentContact = (index, contact) => {
        setCurrentSelected(index);
        setCurrentContact(contact);
        changeContact(contact);
    }


    return (
        <>
            <FormContainer>
                <div className='contacts'>
                    {
                        contacts != null ? contacts.map((contact, index) => {
                            return (
                                <div className={`contact ${
                                    index === currentSelected ? 'selected' : ''
                                }`} 
                                key={index} 
                                onClick={() => changeCurrentContact(index, contact)}
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
                        <div/>
                    } 
                </div>
                <button onClick={removeContact}>Delete</button>
            </FormContainer>
            <ToastContainer />
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
gap: 2rem;

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    button {
        width: 10rem;
    }
}
img {
    height: 4rem;
}
.username {
    h3 {
        color: white;
    }
}
.contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    width: 16rem;
    max-height: 13rem;
    &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
}
.contact {
    display: flex;
    min-height: 5rem;
    width: 90%;
    cursor: pointer;
    border-radius: 0.2rem;
    padding: 0.4rem;
    gap: 1rem;
    align-items: center;
    transition: 0.5s ease-in-out;
}
.selected {
    background-color: #9186f3;
}

`;