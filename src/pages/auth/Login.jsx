
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate, Link } from "react-router-dom";
import { 
    Box,
    Divider,
    Stack,
    Button,
    TextField,
} from '@mui/material';

import { PageContainer } from "pages/pageContainer";
import { useAxios } from 'hooks/exports';
import { useAuthUpdate } from 'contexts/exports';


const LoginPage = (props) => {

    // Theme
    const theme = useTheme();

    // Auth
    const updateAuthData = useAuthUpdate();
    const api = useAxios();

    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const logIn = () => {

        let isError = false;
        
        if ( Object.keys(form).length < 2 ) { return };
        if ( form.username && form.username.length === 0 ) { return };

        // Password 1
        if ( (form.password === '') || (form.password && form.password.length < 8) ) {
            setErrors( (e) => ({...e, password: 'Password must be at least 8 characters long'}) );
            isError = true;
        } else {
            setErrors((e) => { delete e['password']; return e; });
        }

        if (isError) return;

        let data = structuredClone(form);

        if (form.username.includes('@')) {
            data = {password: data.password, email: data.username};
        };

        api.post("api/token/", JSON.stringify(data))
            .then( res => {
                console.log("Res?.data:", res?.data);
                res?.data && updateAuthData({tokens: res.data});
                setForm({});
                navigate("/", { replace: true });
            })
            .catch( err => {
                console.log("Err:", err);
                // console.log("Data 1:", err?.response?.data);
                if (!err?.response?.data) return;
                if (!err?.response?.status) return 
                console.log("Data 2:", err?.response?.data);
                setErrors({...errors, ...err?.response?.data});


                if (err?.response?.status === 423) {
                    navigate(
                        "/verify", 
                        { 
                            replace: true, 
                            state: { 
                                email: data.email,
                                password: data.password,
                            } 
                        });
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
            <h1>Login</h1>
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
                { Object.keys(errors).length > 0 && 
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
                <TextField 
                    error={ !!errors?.username }
                    value={ form.username || '' } 
                    onChange={ (e) => setForm({...form, username: e.target.value}) }
                    sx={{textAlign: 'center'}}
                    label={'username / email'}
                    required={true}
                />
                <TextField 
                    error={ !!errors?.password }
                    value={ form.password || '' } 
                    onChange={ (e) => setForm({...form, password: e.target.value}) } 
                    label={'password'}
                    type={"password"}
                    required={true}
                />
                <Button 
                    variant="contained" 
                    sx={{}}
                    onClick={ logIn }
                >
                    Login
                </Button>

                <Divider />
                
                <Button 
                    variant="contained" 
                    sx={{}}
                >
                    <Link to="/signup">Don't have an account?</Link>
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

export default LoginPage;