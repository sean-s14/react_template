
import Box from '@mui/material/Box'


const PageContainer = ({children, style}) => {

    return (
        <Box
            sx={{
                padding: "15px",
                ...style
            }}
        >
            {children}
        </Box>
    )
}


export { PageContainer };