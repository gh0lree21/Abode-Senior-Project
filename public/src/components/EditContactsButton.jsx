import React from 'react';
import styled from 'styled-components';
import ContactBook from '../assets/contact-book.png';

export default function EditContactsButton ({ changeEditContacts }) {

    const handleClick = () => {
        changeEditContacts();
    };
    return (
        <Button onClick={handleClick}>
            <h3>EDIT</h3>
        </Button>
    )
}

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: #ACE1AF;
border: none;
cursor: pointer;
img {
    .opacity {
        
    }
}
svg {
    font-size: 1.3rem;
    color: #ebe7ff;
}
`;