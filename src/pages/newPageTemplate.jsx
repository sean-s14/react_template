
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import { PageContainer } from "pages/pageContainer";


const NewPageTemplate = (props) => {

    const theme = useTheme();

    return (
        <PageContainer>
            <h1>New Page Tempalte</h1>
        </PageContainer>
    )
}

export { NewPageTemplate };