
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import { PageContainer } from "pages/pageContainer";
import { useAxios } from 'hooks/exports';


const ContactPage = (props) => {

    const theme = useTheme();
    const api = useAxios();

    return (
        <PageContainer>
            <h1>Contact Me</h1>
        </PageContainer>
    )
}

export default ContactPage;