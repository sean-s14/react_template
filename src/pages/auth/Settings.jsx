import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import { PageContainer } from "pages/pageContainer";
import { useAxios, useAuthData } from 'hooks/exports';
import { useAuthUpdate } from 'contexts/exports';
import { Input } from 'components/exports';


const SettingsPage = (props) => {

    // Theme
    const theme = useTheme();

    // Auth
    const updateAuthData = useAuthUpdate();
    const api = useAxios();
    const { profile } = useAuthData();

    const [userInfo, setUserInfo] = useState({});

    // useEffect( () => {
    //     console.log('Username:', userInfo.username)
    // }, [userInfo])

    const handleUsername = (e) => {
        setUserInfo({...userInfo, username: e.target.value});
    };

    const handleEmail = (e) => {
        setUserInfo({...userInfo, email: e.target.value});
    };

    return (
        <PageContainer 
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1>Settings</h1>
            <Input 
                value={ userInfo.username || profile.username || '' } 
                placeholder={ 'username' }
                onChange={ handleUsername } 
            />
            <Input 
                value={ userInfo.email || profile.email || '' } 
                placeholder={ 'email' }
                onChange={ handleEmail } 
            />
            <Link to="">Change Photo</Link>
            <Link to="">Change Password</Link>
        </PageContainer>
    )
}

export default SettingsPage;