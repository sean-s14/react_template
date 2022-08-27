import App from './App';
import './App.css';

import { AuthProvider } from 'contexts/exports';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: { mode: "dark" },
    typography: { fontFamily: "Nunito, Roboto, Arial" },
  })

export default function Provider({children}) {

    return (
        <AuthProvider>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline /> {/* To apply the above theme */}
                <App />
            </ThemeProvider>
        </AuthProvider>
    )
}