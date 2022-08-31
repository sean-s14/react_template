import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

import { PageContainer } from "pages/pageContainer";
import { useAxios, useAuthData } from 'hooks/exports';
import { useAuthUpdate } from 'contexts/exports';


const SettingsPage = (props) => {

    // Theme
    const theme = useTheme();

    // Auth
    const updateAuthData = useAuthUpdate();
    const api = useAxios();
    const { profile, loading } = useAuthData();

    const [userInfo, setUserInfo] = useState({});

    useEffect( () => {
        console.log('Profile:', profile);
    }, [profile])

    // useEffect( () => {
    //     console.log('Username:', userInfo.username)
    // }, [userInfo])

    const handleUsername = (e) => {
        setUserInfo({...userInfo, username: e.target.value});
    };

    const handleEmail = (e) => {
        setUserInfo({...userInfo, email: e.target.value});
    };

    const saveChanges = (e) => {

        let data = JSON.stringify(userInfo);
        api.patch("auth/user/", data)
            .then( res => {
                console.log("Res?.data:", res?.data);
                res?.data && updateAuthData({tokens: res.data});
                setUserInfo({});
            })
            .catch( err => console.log(err));
    };

    if (loading) return null;

    return (
        <PageContainer 
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1>Settings</h1>

            <Stack 
                spacing={3} 
                direction="column"
                sx={{
                    width: '18rem',
                    '& > button, & > div': {
                        width: '100%',
                        color: theme.palette.primary.light,
                        fontSize: '1rem',
                        '& > input': {
                            fontSize: '1.3rem',
                        },
                        '& > a': {
                            fontSize: '1rem',
                            textDecoration: 'none',
                            color: theme.palette.primary.light
                        }
                    },
                }}
            >
                <TextField 
                    value={ userInfo.username || profile.username || '' } 
                    placeholder={ 'username' }
                    onChange={ handleUsername }
                    sx={{textAlign: 'center'}}
                    label={'username'}
                />
                <TextField 
                    value={ userInfo.email || profile.email || '' } 
                    placeholder={ 'email' }
                    onChange={ handleEmail } 
                    label={'email'}
                />
                <Button 
                    variant="contained" 
                    sx={{}}
                    onClick={ saveChanges }
                >
                    Save Changes
                </Button>
                <Divider />
                <Button 
                    variant="contained" 
                    sx={{}}
                >
                    <Link to="">Change Photo</Link>
                </Button>
                <Button 
                    variant="contained" 
                    sx={{}}
                >
                    <Link to="/password-change">Change Password</Link>
                </Button>
            </Stack>
            
        </PageContainer>
    )
}

export default SettingsPage;