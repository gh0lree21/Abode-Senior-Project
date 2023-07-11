import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function EditContactsButton () {

    const navigate = useNavigate();
    const handleClick = async () => {
        navigate('/editContacts');
    };
    return (
        <Button onClick={handleClick}>
            <h2>Edit</h2>
        </Button>
    )
}

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: #9a86f3;
border: none;
cursor: pointer;
svg {
    font-size: 1.3rem;
    color: #ebe7ff;
}
`;