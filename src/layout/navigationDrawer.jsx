import * as React from 'react';
import { useEffect } from 'react';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// List
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import FeedIcon from '@mui/icons-material/Feed';
import ArticleIcon from '@mui/icons-material/Article';
import DevicesIcon from '@mui/icons-material/Devices';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';  // For signup

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

    const [state, setState] = React.useState({ left: false });

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
            icon: <HomeIcon />
        },
        {
            name: "Projects",
            path: "projects",
            icon: <DevicesIcon />
        },
        {
            name: "Articles",
            path: "articles",
            icon: <ArticleIcon />
        },
    ]

    const routes2 = [
        {
            name: "About",
            path: "about",
            icon: <QuestionMarkIcon />
        },
        {
            name: "Policies",
            path: "policies",
            icon: <FeedIcon />
        },
    ]

    auth?.tokens?.access 
        ? routes2.push({
            name: "Logout",
            path: "logout",
            icon: <LogoutIcon />,
            func: () => authUpdate("clear")
            })
        : routes2.push({
            name: "Login",
            path: "login",
            icon: <LoginIcon />
            },
            {
            name: "Signup",
            path: "signup",
            icon: <PersonAddIcon />
            })

    useEffect( () => {
        console.log(theme)
    }, [theme])

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
        </Box>
    );

    const anchor = "left"

    return (
        <>
            <Button onClick={toggleDrawer(anchor, true)}>
                <MenuIcon fontSize='large' />
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