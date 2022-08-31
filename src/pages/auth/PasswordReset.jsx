
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { PageContainer } from "pages/pageContainer";
import { useAxios } from 'hooks/exports';
// import { useAuthUpdate } from 'contexts/exports';


const PasswordResetPage = (props) => {

    // Theme
    const theme = useTheme();

    // Auth
    // const updateAuthData = useAuthUpdate();
    const api = useAxios();

    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [stage, setStage] = useState(0);

    useEffect( () => {
        console.log("Form:", form);
    }, [form])

    const sendEmail = () => {

        if ( form.email && form.email.length === 0 ) { return };

        api.patch("auth/user/reset-password/", JSON.stringify(form))
            .then( res => {
                console.log("Res Data:", res?.data);
                setStage(1);
            }).catch( err => { console.log(err) })
    };

    const verifyCode = () => {

        if ( form.email && form.email.length === 0 ) { return };
        if ( form.code && form.code.length === 0 ) { return };

        api.patch("auth/user/reset-password/", JSON.stringify(form))
            .then( res => {
                console.log("Res Data:", res?.data);
                setStage(2);
            }).catch( err => { console.log(err) })
    };

    const updatePass = () => {

        if ( form.email && form.email.length === 0 ) { return };
        if ( form.code && form.code.length === 0 ) { return };
        if ( form.new_password && form.new_password.length === 0 ) { return };
        if ( form.new_password2 && form.new_password2.length === 0 ) { return };

        api.patch("auth/user/reset-password/", JSON.stringify(form))
            .then( res => {
                console.log("Res Data:", res?.data);
                navigate("/", { replace: true });
            }).catch( err => { console.log(err) })
    };



    return (
        <PageContainer
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1>Reset Password</h1>
            <Stack 
                spacing={2}
                direction="column"
                sx={{
                    width: '18rem',
                }}
            >
                { stage === 0 
                    ?   <>
                            <TextField 
                                value={ form.email || '' } 
                                onChange={ (e) => setForm({...form, email: e.target.value}) }
                                sx={{}}
                                label={'email'}
                                required={true}
                            />
                            <Button 
                                variant="contained" 
                                sx={{ color: theme.palette.primary.light }}
                                onClick={ sendEmail }
                            >
                                Send Email
                            </Button>
                        </>
                    : stage === 1
                    
                    ?   <>
                            <TextField 
                                value={ form.code || '' } 
                                onChange={ (e) => setForm({...form, code: e.target.value}) }
                                sx={{}}
                                label={'code'}
                                required={true}
                            />
                            <Button 
                                variant="contained" 
                                sx={{ color: theme.palette.primary.light }}
                                onClick={ verifyCode }
                            >
                                Verify Code
                            </Button>
                        </>

                    : stage === 2
                    
                    ?   <>
                            <TextField 
                                value={ form.new_password || '' } 
                                onChange={ (e) => setForm({...form, new_password: e.target.value}) }
                                sx={{}}
                                label={'new password'}
                                type={"password"}
                                required={true}
                            />
                            <TextField 
                                value={ form.new_password2 || '' } 
                                onChange={ (e) => setForm({...form, new_password2: e.target.value}) }
                                sx={{}}
                                label={'new password again'}
                                type={"password"}
                                required={true}
                            />
                            <Button 
                                variant="contained" 
                                sx={{ color: theme.palette.primary.light }}
                                onClick={ updatePass }
                            >
                                Update Password
                            </Button>
                        </>
                    
                    :   <>
                            <div>Something went wrong. Refresh page to start again.</div>
                        </>
                }
            </Stack>
        </PageContainer>
    )
}

export default PasswordResetPage;