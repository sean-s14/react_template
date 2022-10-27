import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

import { PageContainer } from "layout/pageContainer";
import { useAxios } from 'hooks/exports';

const HomePage = () => {

    const api = useAxios();

    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     api.get("login/success")
    //         .then( res => {
    //             if (res.status === 200) return res.json();
    //             throw new Error("authentication has been failed!");
    //         })
    //         .then( resObject => {
    //             setUser(resObject.user);
    //         })
    //         .catch( err => {});
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const refreshToken = () => {
        api.post("auth/refresh/", {})
            .then( res => {})
            .catch( err => {});
    }

    return (
        <PageContainer>
            <h1>Home Page</h1>
            { user && user.toString() }
            <Button variant="contained" onClick={ refreshToken }>
                Refresh Access Token
            </Button>
        </PageContainer>
    );
};

export { HomePage };