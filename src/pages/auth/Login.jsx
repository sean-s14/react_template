
import { useState } from 'react';
// import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

import { PageContainer } from "pages/pageContainer";
import { Input, FormButton, Form } from "components/exports";
import { useAxios } from 'hooks/exports';
import { useAuthUpdate } from 'contexts/exports';


const LoginPage = (props) => {

    // Theme
    // const theme = useTheme();

    // Auth
    const updateAuthData = useAuthUpdate();
    const api = useAxios();

    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const logIn = (e) => {
        e.preventDefault();
        
        if ( form.username && form.username.length === 0 ) { return }
        if ( form.username && form.password.length === 0 ) { return }

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
            <h1>Login Page</h1>
            <Form onSubmit={ logIn } >
                <Input
                    placeholder={"username / email"} 
                    value={ form.username } 
                    onChange={ (e) => setForm({...form, username: e.target.value}) } 
                    />
                <Input 
                    placeholder={"password"} 
                    value={ form.password } 
                    type={"password"}
                    onChange={ (e) => setForm({...form, password: e.target.value}) } 
                />
                <FormButton title={"Login"} />
            </Form>
        </PageContainer>
    )
}

export default LoginPage;