import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProfile } from '../../../Actions/profile';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Paper, Avatar, Button, Container, Grid } from '@mui/material'

import CustomField from './customField'

import { updateProfile } from '../../../Actions/profile';
import BuisnessLogo from './buisnessLogo';

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    marginBottom: '20px'
  },
  root: {
    '& .MuiTextField-root': {
      margin: '10px',
    },
  },
  avatar: {
    margin: '10px',
    backgroundColor: 'white',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '30px',
    marginBottom: '30px'
  },
  submit: {
    marginTop: '30px'
  },
  googleButton: {
    // marginBottom: theme.spacing(2),
  },
}));


export default function Form({ user }) {

  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [switchState, setSwitchState] = useState(0);

  const [form, setForm] = useState({
    name: '',
    email: '',
    buisnessName: '',
    buisnessAddress: '',
    phoneNumber: '',
    logo: ''

  })

  const { profiles, isLoading } = useSelector(state => state.ProfileReducer);

  useEffect(() => {
    dispatch(getProfile(user?.result?._id || user?.result?.googleId));
  }, [dispatch])

  useEffect(() => {
    if (profiles) {
      setForm(profiles[0])
    }
  }, [profiles])

  // console.log(form?.logo)

  const handleSubmit = () =>{
    dispatch(updateProfile(form._id, form))
    setSwitchState(0)

  }

  const handleChange = (e) =>{
    console.log(e.target.name, e.target.value)
    setForm({...form , [e.target.name] : e.target.value})
  }

  return (
    <>
      {switchState === 0 && <>
        <Container component="main" maxWidth="sm">
          <Paper className={classes.paper} elevation={2} >
            <Avatar style={{ width: '100px', height: '100px', margin: '30px' }} src={form?.logo} alt="" className={classes.Avatar} >
            </Avatar>
            {/* {console.log(form)} */}
            {form?.buisnessName && <p>{form?.buisnessName}</p> }
            {form?.buisnessAddress && <p>{form?.buisnessAddress}</p> }
            {form?.phoneNumber && <p>{form?.phoneNumber}</p> }
            {form?.email && <p>{form?.email}</p> }
          
            <Button variant="outlined" style={{ margin: '30px', padding: '15px 30px' }} onClick={() => setSwitchState(1)}>Edit Profile</Button>
          </Paper>
        </Container>
      </>}

      {switchState === 1 && <>
        <Container component="main" maxWidth="sm">
          <Paper className={classes.paper} elevation={1} >
            <Avatar style={{ width: '100px', height: '100px' }} src={form?.logo} alt="" className={classes.avatar}>
            </Avatar>
            {/* {console.log(form?.logo)} */}
            {/* <img src={form?.logo} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%'}}/> */}
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <BuisnessLogo form={form} setForm={setForm}/>
                <CustomField name="email" label="Email Address" handleChange={handleChange} type="email" half value={form?.email} />
                <CustomField name="phoneNumber" label="Phone Number" handleChange={handleChange} type="text" half value={form?.phoneNumber} />
                <CustomField name="buisnessName" label="Business Name" handleChange={handleChange} type="text" value={form?.buisnessName} />
                <CustomField name="buisnessAddress" label="Contact Address" handleChange={handleChange} type="text" value={form?.buisnessAddress} />
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Update Settings
              </Button>
              <Grid container justifyContent="flex-end">
              </Grid>
            </form>
          </Paper>
        </Container>

      </>}


    </>
  )
}
