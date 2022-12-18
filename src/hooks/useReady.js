import { useState, useEffect } from 'react';
import { useAuth } from 'contexts/exports';

/**
 * Determines if the user is logged in
 * @returns {Boolean} isLoading  Defaults to true
 * @returns {Boolean} isLoggedIn Defaults to false
 */
const useReady = () => {

    const auth = useAuth();

    const [loading, setLoading] = useState(null);
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect( () => {
        // eslint-disable-next-line no-unused-vars
        let isMounted = true;

        const access_token = auth?.accessToken;

        if (!!access_token) {
            setLoggedIn(true);
            setLoading(false);
        } else {
            setLoggedIn(false);
            setLoading(false);
        }

        return () => { isMounted = false };
    }, [auth])

    return {
        isLoading: loading,
        isLoggedIn: loggedIn,
    };
}

export default useReady;