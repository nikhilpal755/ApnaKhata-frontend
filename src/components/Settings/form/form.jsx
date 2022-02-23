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

}));


export default function Form({ user }) {

  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [switchState, setSwitchState] = useState(0);

  const [formdata, setFormdata] = useState({
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
      setFormdata(profiles[0])
    }
  }, [profiles])

  // console.log(form?.logo)

  const handleSubmit = () => {
    dispatch(updateProfile(formdata._id, formdata))
    setSwitchState(0)

  }

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value)
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper} elevation={2} >
          <Avatar style={{ width: '100px', height: '100px', margin: '30px' }} src={formdata?.logo} alt="hai nhi" className={classes.avatar} >
          </Avatar>
          {switchState === 0 && <>
            {/* {console.log(form)} */}
            {formdata?.buisnessName && <p>{formdata?.buisnessName}</p>}
            {formdata?.buisnessAddress && <p>{formdata?.buisnessAddress}</p>}
            {formdata?.phoneNumber && <p>{formdata?.phoneNumber}</p>}
            {formdata?.email && <p>{formdata?.email}</p>}

            <Button variant="outlined" style={{ margin: '30px', padding: '15px 30px' }} onClick={() => setSwitchState(1)}>Edit Profile</Button>
          </>}
        {switchState === 1 && <>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <BuisnessLogo form={formdata} setForm={setFormdata} />
                <CustomField name="email" label="Email Address" handleChange={handleChange} type="email" half value={formdata?.email} />
                <CustomField name="phoneNumber" label="Phone Number" handleChange={handleChange} type="text" half value={formdata?.phoneNumber} />
                <CustomField name="buisnessName" label="Business Name" handleChange={handleChange} type="text" value={formdata?.buisnessName} />
                <CustomField name="buisnessAddress" label="Contact Address" handleChange={handleChange} type="text" value={formdata?.buisnessAddress} />
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Update Settings
              </Button>
              <Grid container justifyContent="flex-end">
              </Grid>
            </form>
        </>}
        </Paper>
      </Container>

         {/* <Container component="main" maxWidth="sm">
           <Paper className={classes.paper} elevation={1} >
             <Avatar style={{ width: '100px', height: '100px' }} src={form?.logo} alt="" className={classes.avatar}>
             </Avatar>
          
             </form>
           </Paper>
         </Container>
 */}


    </>
  )
}
