
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { PageContainer } from "pages/pageContainer";
import { useAxios } from 'hooks/exports';
import { useAuthUpdate } from 'contexts/exports';


const VerificationPage = (props) => {

    // Theme
    const theme = useTheme();

    // Auth
    const updateAuthData = useAuthUpdate();
    const api = useAxios();

    const navigate = useNavigate();
    let location = useLocation();
    const [form, setForm] = useState({});

    useEffect( () => {
        console.log('Location State:', location.state);
        setForm({...form, ...location.state})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const verify = (e) => {
        e.preventDefault();
        
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

        let data = JSON.stringify(form);
        api.post("api/token/", data)
            .then( res => {
                console.log("Res?.data:", res?.data);
                res?.data && updateAuthData({tokens: res.data});
                navigate("/", { replace: true });
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
            <h1>Verify Your Account</h1>
            <Stack 
                spacing={2} 
                direction="column"
                sx={{
                    width: '12rem',
                    '& > button, & > div': {
                        width: '100%',
                        color: theme.palette.primary.light,
                        fontSize: '1rem',
                        '& *': {
                            fontSize: '1.3rem',
                        },
                        '& input': {
                            textAlign: 'center',
                        },
                    },
                }}
            >
                <TextField 
                    value={ form.code || '' } 
                    onChange={ (e) => setForm({...form, code: e.target.value}) } 
                    label={'code'}
                    // type={"password"}
                    required={true}
                />
                <Button 
                    variant="contained" 
                    sx={{}}
                    onClick={ verify }
                >
                    Verify
                </Button>

            </Stack>

        </PageContainer>
    )
}

export default VerificationPage;