
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

import { PageContainer } from "pages/pageContainer";
import { useAxios } from 'hooks/exports';


const SignupPage = (props) => {

    // Theme
    const theme = useTheme();

    // Auth
    const api = useAxios();

    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const signUp = () => {

        if ( Object.keys(form).length < 3 ) { return };
        
        // if ( form.username && form.username.length === 0 ) { return }
        if ( form.email && form.email.length === 0 ) { return }
        if ( form.password && form.password.length < 8 ) { 
            // Add error/warning messages
            return 
        }
        if ( form.password2 && form.password2.length < 8 ) { 
            // Add error/warning messages
            return
        }

        api.post("auth/user/create/", JSON.stringify(form))
            .then( res => {
                console.log("Res?.data:", res?.data);
                navigate(
                    "/verify", 
                    { 
                        replace: true, 
                        state: { 
                            email: form.email,
                            password: form.password,
                        } 
                    });
            })
            .catch( err => {
                console.log("Err:", err);
                if (!err?.response?.data) return;
                if (!err?.response?.status) return 

                if (err?.response?.status === 423) {
                } else {
                }
            });
    };

    return (
        <PageContainer
            style={{
                maxWidth: '100vw',
                height: '100%',
                maxHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <h1>Signup</h1>
            <Stack 
                spacing={2} 
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
                    value={ form.username || '' } 
                    onChange={ (e) => setForm({...form, username: e.target.value}) }
                    sx={{textAlign: 'center'}}
                    label={'username'}
                />
                <TextField 
                    value={ form.email || '' } 
                    onChange={ (e) => setForm({...form, email: e.target.value}) } 
                    label={'email'}
                    type={"email"}
                    required={true}
                />
                <TextField 
                    value={ form.password || '' } 
                    onChange={ (e) => setForm({...form, password: e.target.value}) } 
                    label={'password'}
                    type={"password"}
                    required={true}
                />
                <TextField 
                    value={ form.password2 || '' } 
                    onChange={ (e) => setForm({...form, password2: e.target.value}) } 
                    label={'password again'}
                    type={"password"}
                    required={true}
                />
                <Button 
                    variant="contained" 
                    sx={{}}
                    onClick={ signUp }
                >
                    Signup
                </Button>

                <Divider />
                
                <Button 
                    variant="contained" 
                    sx={{}}
                >
                    <Link to="/login">Already have an account?</Link>
                </Button>
                <Button 
                    variant="contained" 
                    sx={{}}
                >
                    <Link to="/password-reset">Forgot Your Password?</Link>
                </Button>
            </Stack>
        </PageContainer>
    )
}

export default SignupPage;