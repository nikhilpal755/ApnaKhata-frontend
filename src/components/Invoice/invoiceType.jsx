import React from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'



export default function InvoiceType({type, setType}) {


    const handleChange = (event) =>{
        setType(event.target.value);

    }
    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" >Select Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Age"
                    onChange={ handleChange}
                   
                >
                    <MenuItem value={'Invoice'} >Invoice</MenuItem>
                    <MenuItem value={'Receipt'} >Receipt</MenuItem>
                    <MenuItem value={'Bill'} >Bill</MenuItem>
                    <MenuItem value={'Estimate'} >Estimate</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}
