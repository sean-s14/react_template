
import Box from '@mui/material/Box'


const PageContainer = (props) => {

    return (
        <Box
            sx={{
                padding: "15px"
            }}
        >
            {props.children}
        </Box>
    )
}


export { PageContainer };