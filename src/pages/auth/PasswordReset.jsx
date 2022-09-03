
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { 
    Box,
    Stack,
    Button,
    TextField,
} from '@mui/material';

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
    const [errors, setErrors] = useState({});
    const [stage, setStage] = useState(0);

    useEffect( () => {
        console.log("Form:", form);
    }, [form])

    const sendEmail = () => {

        let isError = false;
        
        // Email
        if ( (!form?.email) || (form.email === '') || (form.email && form.email.length === 0) ) {
            setErrors( (e) => ({...e, email: 'Your email address is required'}) );
            isError = true;
        } else {
            setErrors((e) => { delete e['email']; return e; });
        }

        if (isError) return;

        api.patch("auth/user/reset-password/1/", JSON.stringify(form))
            .then( res => {
                console.log("Res Data:", res?.data);
                setErrors({});
                setStage(1);
            })
            .catch( err => {
                if (!err?.response?.data) return;
                if (!err?.response?.status) return;
                setErrors( e => ({...e, ...err?.response?.data}) );
            });
    };

    const verifyCode = () => {

        let isError = false;
        
        // Code
        if ( (!form?.code) || (form.code === '') || (form.code && form.code.length === 0) ) {
            setErrors( (e) => ({...e, code: 'A code is required'}) );
            isError = true;
        } else {
            setErrors((e) => { delete e['code']; return e; });
        }

        if (isError) return;

        api.patch("auth/user/reset-password/2/", JSON.stringify(form))
            .then( res => {
                console.log("Res Data:", res?.data);
                setErrors({});
                setStage(2);
            })
            .catch( err => {
                console.log("Err:", err);
                if (!err?.response?.data) return;
                if (!err?.response?.status) return;
                setErrors( e => ({...e, ...err?.response?.data}) );
            });
    };

    const updatePass = () => {

        let isError = false;
        
        // New Password
        if ( 
            (!form?.new_password) || 
            (form.new_password === '') || 
            (form.new_password && form.new_password.length === 0)
        ) {
            setErrors( (e) => ({...e, new_password: 'A new password is required'}) );
            isError = true;
        } else {
            setErrors((e) => { delete e['new_password']; return e; });
        }
        
        // New Password 2
        if ( 
            (!form?.new_password2) || 
            (form.new_password2 === '') || 
            (form.new_password2 && form.new_password2.length === 0)
        ) {
            setErrors( (e) => ({...e, new_password2: 'Matching password is required'}) );
            isError = true;
        } else {
            setErrors((e) => { delete e['new_password2']; return e; });
        }

        if (isError) return;

        api.patch("auth/user/reset-password/3/", JSON.stringify(form))
            .then( res => {
                console.log("Res Data:", res?.data);
                setErrors({});
                navigate("/", { replace: true });
            })
            .catch( err => {
                console.log("Err:", err);
                if (!err?.response?.data) return;
                if (!err?.response?.status) return;
                setErrors( e => ({...e, ...err?.response?.data}) );
            });
    };



    return (
        <PageContainer
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1>
                { stage === 0 && 'Enter your email' }
                { stage === 1 && 'Enter code' }
                { stage === 2 && 'Reset Password' }
            </h1>

            <Stack 
                spacing={2}
                direction="column"
                sx={{
                    width: '18rem',
                }}
            >
                {   Object.keys(errors).length > 0 && 
                    !Object.keys(errors).includes(['email', 'code', 'new_password', 'new_password2']) &&
                    <Box 
                        sx={{
                            backgroundColor: theme.palette.error.dark,
                            borderRadius: '.3rem',
                            p: 1,
                        }}
                    >
                        { Object.values(errors).map( (txt, index) => 
                            <Box key={index}>{txt}</Box>
                        )}
                    </Box>
                }
                { stage === 0 
                    ?   <>
                            <TextField 
                                error={ !!errors?.email }
                                helperText={ errors?.email }
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
                                error={ !!errors?.code }
                                helperText={ errors?.code }
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
                                error={ !!errors?.new_password }
                                helperText={ errors?.new_password }
                                value={ form.new_password || '' } 
                                onChange={ (e) => setForm({...form, new_password: e.target.value}) }
                                sx={{}}
                                label={'new password'}
                                type={"password"}
                                required={true}
                            />
                            <TextField 
                                error={ !!errors?.new_password2 }
                                helperText={ errors?.new_password2 }
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
                                Reset Password
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