import { useState, useEffect } from 'react';

// Custom
import { useAuth } from 'contexts/exports';


const useAuthData = () => {

    const auth = useAuth();

    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);

    useEffect( () => {
        // eslint-disable-next-line no-unused-vars
        let isMounted = true;

        const user = auth?.user;
        user?.email     ? setEmail(user.email)         : setEmail(false);
        user?.username  ? setUsername(user.username)   : setUsername(false);
        user?.photo     ? setPhoto(user.photo)         : setPhoto(false);
        user?.createdAt ? setCreatedAt(user.createdAt) : setCreatedAt(false);

        return () => { isMounted = false };
    }, [auth])

    return {
        email: email,
        username: username, 
        photo: photo,
        createdAt: createdAt,
    };
}

export default useAuthData;