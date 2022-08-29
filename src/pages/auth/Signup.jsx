
import { useState } from 'react';
// import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

import { PageContainer } from "pages/pageContainer";
import { Input, Button, Form } from "components/exports";
import { useAxios } from 'hooks/exports';


const SignupPage = (props) => {

    // Theme
    // const theme = useTheme();

    // Auth
    const api = useAxios();

    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const signUp = (e) => {
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

        // let data = JSON.stringify(form);
        let data = {
            email: 'test12@gmail.com',
            password: 'S3an1234',
            password2: 'S3an1234',
        }
        api.post("auth/user/create/", JSON.stringify(data))
            .then( res => {
                console.log("Res?.data:", res?.data);
                navigate(
                    "/verify", 
                    { 
                        replace: true, 
                        state: { 
                            email: data.email,
                            password: data.password,
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
            <h1>Signup Page</h1>
            <Form onSubmit={ signUp } >
                <Input
                    placeholder={"username"} 
                    value={ form.username } 
                    onChange={ (e) => setForm({...form, username: e.target.value}) } 
                />
                <Input
                    placeholder={"email"} 
                    value={ form.email } 
                    onChange={ (e) => setForm({...form, email: e.target.value}) } 
                />
                <Input 
                    placeholder={"password"} 
                    value={ form.password } 
                    type={"password"}
                    onChange={ (e) => setForm({...form, password: e.target.value}) } 
                />
                <Input 
                    placeholder={"password"} 
                    value={ form.password2 } 
                    type={"password"}
                    onChange={ (e) => setForm({...form, password2: e.target.value}) } 
                />
                <Button title={"Signup"} />
            </Form>
        </PageContainer>
    )
}

export default SignupPage;