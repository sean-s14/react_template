import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";

import {
    // MuiDrawer,
    // MuiAppBar,
    Toolbar,
    Typography,
    Divider,
    IconButton,

    // List
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

// Icons
import {
    Home,
    QuestionMark,
    Feed,
    Article,
    Devices,
    Menu,
    ChevronLeft,
    ChevronRight,
    
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
import { useAuth, useAuthUpdate } from 'contexts/exports';
import { useVariables } from 'hooks/exports';


const openedMixin = (theme, vars) => ({
    width: vars.drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme, vars) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme, vars }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    height: vars.appBarHeight,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open'})(({ theme, open, vars }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: vars.drawerWidth,
        width: `calc(100% - ${vars.drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, vars }) => ({
        width: vars.drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
        ...openedMixin(theme, vars),
            '& .MuiDrawer-paper': openedMixin(theme, vars),
        }),
        ...(!open && {
        ...closedMixin(theme, vars),
            '& .MuiDrawer-paper': closedMixin(theme, vars),
        }),
    }),
);

export default function NavigationDrawer2(props) {

    const auth = useAuth();
    const authUpdate = useAuthUpdate();
    const vars = useVariables()

    const theme = useTheme();
    

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

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

  return (
    <>
        <AppBar position="fixed" open={open} vars={vars} >
            <Toolbar sx={{height: vars.appBarHeight}} >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <Menu fontSize={"large"} />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    React Template
                </Typography>
            </Toolbar>
        </AppBar>

        
        <Drawer variant="permanent" open={open} vars={vars}>
            <DrawerHeader vars={vars}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl'
                        ? <ChevronRight fontSize={"large"} /> 
                        : <ChevronLeft fontSize={"large"} />}
                </IconButton>
            </DrawerHeader>

            <Divider />
            
            <List>
                {routes1.map(({name, path, icon, func}, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <Link 
                            to={path}
                            style={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                width: "100%", 
                                textDecoration: "none", 
                                color: theme.palette.text.primary
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >{icon}</ListItemIcon>
                                <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>

            <Divider />

            <List>
                {routes2.map(({name, path, icon, func}, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <Link 
                            to={path}
                            style={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                width: "100%", 
                                textDecoration: "none", 
                                color: theme.palette.text.primary
                            }}>
                            <ListItemButton>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >{icon}</ListItemIcon>
                                <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>

        </Drawer>
    </>
  );
}
