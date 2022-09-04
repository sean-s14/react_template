import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { 
    Box,
    Drawer,
    Button,
    Divider,

    // List
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

// Icons
import {
    Home,
    QuestionMark,
    Feed,
    Article,
    Devices,
    Menu,
    
    // Auth
    Login,
    Logout,
    PersonAdd,
    Settings,
    
    // Socials
    // GitHub,
    // LinkedIn,
    // Telegram,
    // Twitter,
} from '@mui/icons-material';

import { useTheme } from "@mui/material/styles";

import { useAuth, useAuthUpdate } from 'contexts/exports';


export default function NavigationDrawer() {

    const theme = useTheme();
    const auth = useAuth();
    const authUpdate = useAuthUpdate();

    useEffect( () => {
        console.log("Auth:", auth)
        // console.log("Access Tokens:", auth?.tokens?.access)
    }, [auth])

    const [state, setState] = useState({ left: false });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const routes1 = [
        {
            name: "Home",
            path: "/",
            icon: <Home />
        },
        {
            name: "Projects",
            path: "projects",
            icon: <Devices />
        },
        {
            name: "Articles",
            path: "articles",
            icon: <Article />
        },
    ]

    const routes2 = [
        {
            name: "About",
            path: "about",
            icon: <QuestionMark />
        },
        {
            name: "Policies",
            path: "policies",
            icon: <Feed />
        },
    ]

    auth?.tokens?.access 
        ? routes2.push({
            name: "Settings",
            path: "settings",
            icon: <Settings />,
            },
            {
            name: "Logout",
            path: "logout",
            icon: <Logout />,
            func: () => authUpdate("clear")
            })
        : routes2.push({
            name: "Login",
            path: "login",
            icon: <Login />
            },
            {
            name: "Signup",
            path: "signup",
            icon: <PersonAdd />
            })

    // useEffect( () => {
    //     console.log(theme)
    // }, [theme])

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {routes1.map(({name, path, icon}, index) => (
                    <ListItem key={index} disablePadding>
                        <Link 
                            to={path} 
                            style={{
                                width: "100%", 
                                textDecoration: "none", 
                                color: theme.palette.text.primary
                            }}>
                            <ListItemButton>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>

            <Divider />

            <List>
                {routes2.map(({name, path, icon, func}, index) => (
                    <ListItem key={index} disablePadding>
                    { func 
                        ?   <button
                                onClick={ func }
                                style={{
                                    width: "100%", 
                                    color: theme.palette.text.primary,
                                    backgroundColor: 'rgba(0,0,0,0)',
                                    border: 'none',
                                    padding: '0',
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={name} />
                                </ListItemButton>
                            </button>
                        : 
                            <Link 
                                to={path} 
                                style={{
                                    width: "100%", 
                                    textDecoration: "none",
                                    color: theme.palette.text.primary
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={name} />
                                </ListItemButton>
                            </Link>
                    }
                    </ListItem>
                ))}
            </List>

            <Divider />


        </Box>
    );

    const anchor = "left"

    return (
        <>
            <Button onClick={toggleDrawer(anchor, true)}>
                <Menu fontSize='large' />
            </Button>
            <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor)}
            </Drawer>
        </>
    );
}