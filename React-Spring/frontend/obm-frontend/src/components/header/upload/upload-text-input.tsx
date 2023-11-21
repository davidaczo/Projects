import React, { useState } from 'react'
import { makeStyles,  TextField, Typography } from '@material-ui/core'
import uploadData from '../../../Store/upload-data';

const useStyles = makeStyles({
    typography: {
        fontSize: 15,
    },
});

type Props = {
    regex: RegExp;
    errorMess: string;
    placeholder: string;
};

export const UploadTextInput = ({ regex, errorMess, placeholder}: Props) => {
    const classes = useStyles();
    const [text, setText] = useState('');
    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setText(e.target.value)
        uploadData.setNumber(+e.target.value)
    }
    return (
        <>
            <Typography className={classes.typography} variant="subtitle2">{placeholder}</Typography>
            <TextField
                error={!regex.test(text)}
                fullWidth
                helperText={regex.test(text) ? '' : errorMess}
                id="Specie"
                // eslint-disable-next-line react/jsx-no-bind
                onChange={handleChange}
                placeholder={placeholder}
                required
                type="email"
                variant="outlined"
            />
        </>
    )
}
