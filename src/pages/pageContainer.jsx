
import { Box } from '@mui/material';
import { useVariables } from 'hooks/exports';
// import { useEffect } from 'react';

const PageContainer = ({children, style}) => {

    const vars = useVariables();

    // useEffect( () => {
    //     console.log("Variables:", Variables());
    // }, [])

    return (
        <Box
            sx={{
                marginTop: vars.appBarHeight + 'px',
                marginLeft: vars.drawerWidthClosed,
                p: "10px",
                ...style
            }}
        >
            {children}
        </Box>
    )
}

export { PageContainer };