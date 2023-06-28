import React, { useState, useEffect } from 'react';
import loader from '../assets/loader.gif';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { setAvatarRoute } from '../utils/APIRoutes';

const { Buffer } = require('buffer');

export default function SetAvatar() {
    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    const setProfilePicture = async () => {};
    
    useEffect(() => {
        async function fetchData() {
            const data = [];
            for (let i = 0; i < 4; i++){
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                    );
                const buffer = Buffer.from(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            <Container>
                <div className='title-container'>
                    <h1>Pick an avatar as your profile picture</h1>
                </div>    
                <div className='avatars'>{
                    avatars.map((avatar, index) => {
                        return (
                            <div 
                            key={index}
                            className={`avatar ${ 
                                selectedAvatar === index ? "selected" : "" 
                            }`}
                            >
                                <img src={`data:image/svg+xml;base64,${avatar}`} 
                                alt='avatar' 
                                onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        )
                    })
                }
                </div>
            </Container>;
            <ToastContainer />
        </>
    )
}

const Container = styled.div``;