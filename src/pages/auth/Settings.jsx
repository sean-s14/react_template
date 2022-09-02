import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { 
    Avatar,
    Badge,
    Divider,
    Stack,
    Button,
    TextField,
    IconButton,
    Input,
    InputLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { PageContainer } from "pages/pageContainer";
import { useAxios, useAuthData } from 'hooks/exports';
import { useAuthUpdate } from 'contexts/exports';
import DefaultUser from 'static/images/default-user.jpg';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';


const SettingsPage = (props) => {

    // Theme
    const theme = useTheme();

    // Auth
    const updateAuthData = useAuthUpdate();
    const api = useAxios();
    const { profile, isLoading } = useAuthData();

    const [userInfo, setUserInfo] = useState({});

    useEffect( () => {
        console.log('Profile:', profile);
    }, [profile])

    useEffect( () => {
        console.log('User Info:', userInfo)
    }, [userInfo])

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

    const handlePhoto = (e) => {
        console.log('Handling Photo...');
        let file = e.target.files[0];
        console.log("File:", file)
        function getBase64(file, cb) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                cb(reader.result)
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }

        let res = '';
        getBase64(file, (result) => {
            // res = result;
            setUserInfo({...userInfo, imageURI: result})
            // console.log("Result:", result);
        })
        console.log(res);
    };

    if (isLoading) return null;

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
                    alignItems: 'center',
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

                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <IconButton>
                            <InputLabel 
                                htmlFor={"photo-upload"} 
                                sx={{
                                    maxWidth: '3rem', 
                                    maxHeight: '3rem',
                                }}
                            >
                                <ChangeCircleIcon sx={{ fontSize: "3rem" }} />
                            </InputLabel>
                            <Input 
                                id={"photo-upload"}
                                type={"file"} 
                                hidden={true}
                                onChange={ e => handlePhoto(e) }
                                sx={{display: 'none'}}
                            >
                            </Input>
                        </IconButton>
                    }
                >    
                    <Avatar 
                        alt="Default User"
                        src={ profile.photo || DefaultUser }
                        sx={{ 
                            width: 200,
                            maxWidth: 200,
                            height: 200,
                            maxHeight: 200,
                        }}
                        variant={"circular"}
                    />
                </Badge>

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

                <Divider sx={{width: '100%'}} />

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