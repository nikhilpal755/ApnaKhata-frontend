
import React from 'react'
import { TextField, Grid } from '@mui/material'
import { IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { InputAdornment } from '@mui/material'

export default function Field({name, type, onChangeHandler, half, label, autoFocus, handleShowPassword, placeHolder }) {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                type={type}
                onChange={onChangeHandler}
                autoFocus={autoFocus}
                label={label}
                variant="outlined"
                fullWidth
                required
                placeholder={placeHolder}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility" 
                                onClick={handleShowPassword}
                                edge="end"
                            >
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>

                    )
                } : null}
                style={{ marginTop: '15px'}}
            >

            </TextField>
            
        </Grid>
    )
}
