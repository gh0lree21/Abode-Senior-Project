import React, { useState } from 'react';
import styled from 'styled-components';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { addContactRoute, singleUserRoute } from '../utils/APIRoutes';


export default function AddContact () {

    const [currentContact, setCurrentContact] = useState(undefined);
    const [foundContact, setFoundContact] = useState(false);
    const [searchSubmitted, setSearchSubmitted] = useState(false);
    const [value, setValue] = useState({
        username: ""
    });


    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        setSearchSubmitted(true);
        const { username } = value;
        const { data } = await axios.post(singleUserRoute, {
            username
        });
        if (data.status === false) {
            setFoundContact(false);
        };
        if (data.status === true) {
            setFoundContact(true);
            setCurrentContact(data.user);
        };
    };

    const addContact = async () => {
        if (currentContact === undefined) {
            toast.error("No contact selected", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${addContactRoute}/${user._id}`, {
                contact: currentContact
            });
            
            if (data.isSet) {
                user.contacts = data.userContacts.contacts;

                localStorage.setItem("chat-app-user", JSON.stringify(user));
                toast.info(`Successfully added new contact`, toastOptions);
                
            } else {
                toast.error(data.msg, toastOptions);
            }
        }
    };

    const handleChange = (event) => {
        setSearchSubmitted(false);
        setValue({...value, [event.target.name]:event.target.value});
};

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) =>handleSubmit(event)}>
                    <div className='searchBar'>
                        <input
                            type='text'
                            placeholder='Username'
                            name='username'
                            onChange={(e) => handleChange(e)}
                        />
                        <button type="submit">Search</button>
                    </div>
                    <div className='searchResults'>
                        { // if the contact can be found in the DB, display it
                            foundContact ? 
                            <div className='contact'>
                                <div className='avatar'>
                                    <img src={`data:image/svg+xml;base64,${currentContact.avatarImage}`} 
                                    alt='avatar' 
                                    />
                                </div>
                                <div className='username'>
                                    <h3>{currentContact.username}</h3>
                                </div>
                            </div> 
                            :
                            searchSubmitted ? 
                            <h2>No results for <span>{value.username}</span></h2>
                            :
                            <span></span>
                        }
                    </div>
                    <button onClick={addContact}>Add</button>
                </form>
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
img {
    height: 5rem;
}
.username {
    font-size: 2rem;
}
.contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
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
        border: 0.1rem solid #F2F3F4;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #ACE1AF;
            outline: none;
        }
    
    .searchResults {
        padding-top: 1rem;
    }
}
`;