
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { PageContainer } from "pages/pageContainer";
import { useAxios } from 'hooks/exports';
// import { useAuthUpdate } from 'contexts/exports';


const PasswordChangePage = (props) => {

    // Theme
    const theme = useTheme();

    // Auth
    // const updateAuthData = useAuthUpdate();
    const api = useAxios();

    const [form, setForm] = useState({});

    // useEffect( () => {
    //     console.log("Form:", form);
    // }, [form])
    
    const handlePassword = (e, field) => {
        setForm({...form, [field]: e.target.value});
    }

    const saveChanges = (e) => {
        
        if ( Object.keys(form).length < 3 ) { return };
        if ( form.old_password && form.old_password.length === 0 ) { return };
        if ( form.new_password && form.new_password.length === 0 ) { return };
        if ( form.new_password2 && form.new_password2.length === 0 ) { return };

        let data = JSON.stringify(form);
        api.patch("auth/user/change-password/", data)
            .then( res => {
                console.log("Res?.data:", res?.data);
                setForm({});
            })
            .catch( err => console.log(err));
    };

    return (
        <PageContainer
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1>Password Change Page</h1>

            <Stack 
                spacing={2} 
                direction="column"
                sx={{
                    width: '18rem',
                    '& > button': {
                        color: theme.palette.primary.light,
                        fontSize: '1rem',
                    }
                }}
            >
                <TextField 
                    value={ form.old_password || '' } 
                    placeholder={ 'current password' }
                    onChange={ (e) => handlePassword(e, 'old_password') }
                    sx={{textAlign: 'center'}}
                    // label={'password'}
                    required
                />
                <TextField 
                    value={ form.new_password || '' } 
                    placeholder={ 'new password' }
                    onChange={ (e) => handlePassword(e, 'new_password') }
                    // label={'email'}
                    required
                />
                <TextField 
                    value={ form.new_password2 || '' } 
                    placeholder={ 'new password again' }
                    onChange={ (e) => handlePassword(e, 'new_password2') }
                    // label={'password'}
                    required
                />
                <Button 
                    variant="contained" 
                    sx={{}}
                    onClick={ saveChanges }
                >
                    Update Password
                </Button>
            </Stack>
        </PageContainer>
    )
}

export default PasswordChangePage;