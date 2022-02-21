import React from 'react'

import { TextField, Grid } from '@mui/material'

export default function CustomField({name, handleChange, label, half, autoFocus, type, value}) {
  return (
    <>
      <Grid item xs={12} sm={half ? 6 : 12} >
        <TextField
          name={name}
          type={type}
          onChange={handleChange}
          autoFocus={autoFocus}
          label={label}
          variant="outlined"
          fullWidth
          required
          value={value}

        />

      </Grid>
    </>
  )
}
