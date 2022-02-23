import React,{useState} from 'react'

import { Container, Paper, Typography, TextField, Grid, Button } from '@mui/material'
import Field from '../LoginComponents/Field'
import {useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {resetPassword} from '../../Actions/auth'
import Navbar from '../Navbar/navbar'

export default function ResetPassword() {

  const {token} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const user = JSON.parse(localStorage.getItem('profile'))
  if(user)navigate('/dashboard')


  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)
    dispatch(resetPassword(token, form, navigate));
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <>

      <div className='resetPassword' style={{ width: '100vw', height: '100vh', maxWidth: '100%', backgroundColor: '#B3ACE5', overflowY: 'auto' }}>
        <Navbar />
        <div className='content'>

          <div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
            <Container component="main" maxWidth="xs">
              <Paper  variant="outlined">
                <Typography variant="h6" gutter="5">Please enter your new password</Typography>

                <form  noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Field name="password" label="Password" onChangeHandler={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    <Button type="submit" fullWidth variant="contained" color="secondary" >
                      Submit
                    </Button>
                  </Grid>
                </form>
              </Paper>
            </Container>
          </div>


        </div>
      </div>
    </>
  )
}
