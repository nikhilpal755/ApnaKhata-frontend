import React, { useState } from 'react'

import Navbar from '../Navbar/navbar'
import { Grid, Paper, TextField, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './forgotPassword.css'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';

import { forgotPassword } from '../../Actions/auth';

export default function ForgotPassword() {

  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formdata, setFormData] = useState({
    email: ''
  })
  const user = JSON.parse(localStorage.getItem('profile'));

  if(user)navigate('/dashboard')



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(formdata))
    window.navigator.onLine ? setStep(1) : setStep(2)
  }

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }
  return (
    <>
      <div className='forgotPassword' style={{ width: '100vw', height: '100vh', maxWidth: '100%', backgroundColor: '#B3ACE5', overflowY: 'auto' }}>
        <Navbar />

        <div className="content">
          <Grid container spacing={3} justifyContent='center' alignContent='center'>
            <Grid item xs={12} style={{ maxWidth: '400px', marginTop: '7%' }}>
              <Paper variant='outlined' style={{height: '200px'}}>

                {step === 0 && <>
                  <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                    <Typography variant="h6" gutter="5" justifyContent={'center'}>Please enter your email address</Typography>
                    <TextField type='email' name='email' label="Email Address" onChange={handleChange} fullWidth></TextField>
                    <Button type='submit' fullWidth variant='contained' style={{ marginTop: '10px', backgroundColor: '#B3ACE5' }}>submit</Button>
                  </form>
                </>}

                {step === 1 && <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <CheckCircleOutlineIcon
                    color="success"
                    style={{ fontSize: '50px' }} /> </div>
                  <br />
                  <p>A password reset link has been sent to your email. Please follow the link to reset your password</p>
                  <div className="buttons">
                    <button className="button" onClick={() => navigate('/')}>Back to home</button>
                    <button className="button" onClick={() => setStep(0)}>Resend link</button>
                  </div>
                </>}

              
              {step === 2 && (
                  <div>
                   <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                   <ErrorIcon color="error" style={{fontSize: '50px'}}/>
                   </div>
                    <br/>
                    <p>Please check your internet connection and try again</p>
                    <div className="buttons">
                        <button className="button" onClick={() =>navigate('/')}>Back to home</button>
                        <button className="button" onClick={()=>setStep(0)}>Resend link</button>
                      </div>
                  </div>
                )
                }

              </Paper>
            </Grid>


          </Grid>

        </div>

      </div>

    </>
  )
}
