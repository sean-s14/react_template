import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";

// Custom
import { useAuth } from 'contexts/exports';
import { isObject } from 'utils/exports';


const useAuthData = () => {

    const auth = useAuth();

    const [accessToken, setAccessToken] = useState(null);
    // const [refreshToken, setRefreshToken] = useState(null);

    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [photo, setPhoto] = useState(null);

    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    // useEffect( () => console.log("Access Token :", accessToken), [accessToken])
    // useEffect( () => console.log("Refresh Token :", refreshToken), [refreshToken])

    useEffect( () => {
        // eslint-disable-next-line no-unused-vars
        let isMounted = true;
        // console.log("Use Auth Data has mounted...");
        // let accessToken = auth?.tokens?.access;
        let accessToken = auth?.tokens?.accessToken;
        // let refreshToken = auth?.tokens?.refresh;

        if (accessToken) {
            const access = jwt_decode(accessToken);
            console.log("Access:", access);
            setAccessToken(access);

            let email = access?.email;
            email ? setEmail(email) : setEmail('');

            let username = access?.username;
            username ? setUsername(username) : setUsername(''); 

            let photo = access?.imageURI;
            photo ? setPhoto(photo) : setPhoto(''); 
        } else {
            setAccessToken(undefined)
        }
        // if (refreshToken) {
        //     setRefreshToken(refreshToken);
        // } else {
        //     setRefreshToken(undefined);
        // }

        return () => { isMounted = false };
    }, [auth])

    useEffect( () => {
        if (isObject(accessToken) /* && isObject(refreshToken) */) {
            if ( 
                (Object.keys(accessToken).length > 0) /* && 
                (Object.keys(refreshToken).length > 0) */
            ) {
                setLoggedIn(true);
                setLoading(false);
            } else {
                setLoggedIn(false);
                setLoading(false);
            }
        } else if ( 
            (accessToken !== null) 
            // && (refreshToken !== null) 
        ) {
            setLoggedIn(false);
            setLoading(false);
        }
    }, [accessToken/*, refreshToken*/]);

    // useEffect( () => {
    //     if (loading) return;
    //     console.log("email :", email);
    //     console.log("username :", username);
    // }, [loading])


    return {
        isLoading: loading,
        isLoggedIn: loggedIn,
        tokens: accessToken /* && refreshToken */  && {
            access: accessToken,
            // refresh: refreshToken,
        }, 
        profile: {
            email: email, 
            username: username, 
            photo: photo,
        },
    };
}

export default useAuthData;