
import { useState } from 'react';
// import { useTheme } from '@mui/material/styles';


const Input = ({value, defaultValue, placeholder, onChange, style}) => {

    // const theme = useTheme();
    const [text, setText] = useState("");

    return (
        <input
            value={ text || value || '' }
            defaultValue={ defaultValue || '' }
            placeholder={ placeholder }
            onChange={ (e) => setText(e.target.value) }
            style={{
                width: '20rem',
                height: '2.5rem',
                borderRadius: '0.3rem',
                border: 'none',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
                fontSize: '1.1rem',
                textAlign: 'center',
                marginTop: '.5rem',
                marginBottom: '.5rem',
                ...style,
            }}
        />
    )
}

export default Input;