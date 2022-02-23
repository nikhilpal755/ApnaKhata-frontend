import React, { useState } from 'react'

import Paper from '@mui/material/Paper'
import Field from '../../components/LoginComponents/Field'
import { Grid, Typography, Avatar, Button } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Navbar from '../../components/Navbar/navbar'
import { makeStyles } from '@mui/styles'
// import CircularProgress from '@mui/material/CircularProgress';
import { GoogleLogin } from 'react-google-login'
import GoogleButton from 'react-google-button';


import {Link} from 'react-router-dom'

import {useDispatch} from 'react-redux';
import { createProfile } from '../../Actions/profile'

import { SignIn, SignUp } from '../../Actions/auth.js'
import './auth.css'



const useStyles = makeStyles(() => ({
   
    paper: {

        width: '450px',
        padding: '20px'
    },
    mainContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '10vh',
        marginBottom: '10vh'
    },

    lockedIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '10px'
    },

    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },

    btn: {
        padding: '10px',
        margin: '10px',
    }


}))


const initialState = {
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    confirmPassword : '',
    bio : '',
    profilePicture : '',

}

export default function Login() {
    const dispatch = useDispatch();
    
 
    const [signup, setSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formdata, setFormdata] = useState(initialState);

    const user = localStorage.getItem('profile');
    if(user){
        window.location.href = '/dashboard';
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleChange = (e) => {

        setFormdata({...formdata, [e.target.name] : e.target.value})
        
    }
    const handleSubmit = async(e) => {
        // custom signup and signin logic
        //if user doesn't used google login
        e.preventDefault();
        if(signup){
            if(formdata.password === formdata.confirmPassword){
                await SignUp(formdata, dispatch);
            }else{
                console.log('password does not match');
            }
        }else{
           await SignIn(formdata, dispatch);
        }
       

    }


    const googleSuccess = async(res) => {
        // console.log(res);

        const result = res?.profileObj;
        const token = res?.tokenId;

        // console.log(result, token);

        const newProfile = {
            name : result?.name,
            email : result?.email,
            logo : result?.imageUrl,
            userId : result?.googleId,
            phoneNumber : '',
            buisnessAddress : '',
            buisnessName : '',
            website : '',
        }

        // console.log(newProfile)
         dispatch(createProfile(newProfile));

        // after creating a profile we will assign token and authenticate 
        dispatch({type : 'AUTH', data : {result, token}});
        window.location.href="/dashboard";

        


    }

    const googleFailure = (err) => {
        console.log(err);

    }

    const switchMode = () =>{
        setSignup(!signup);
    }

    const classes = useStyles();
    return (
        <div className="signin" >
            <Navbar />

            
        

            <div className={classes.mainContent}>
                <Paper elevation={3} className={classes.paper} style={{ backgroundColor: 'whitesmoke' }} >
                    <div className={classes.lockedIcon}>
                        <Avatar style={{ backgroundColor: '#8128e3' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">{signup ? 'Sign up' : 'Sign in'}</Typography>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Grid item>
                            {
                                signup && (
                                    <>
                                        <div className="signUp" style={{ display: 'flex' }}>

                                            <Field name="firstName" type="text" autoFocus={true} half label="firstName" onChangeHandler={handleChange}></Field>
                                            <Field name="lastName" type="text" autoFocus={false} half label="LastName" onChangeHandler={handleChange}></Field>
                                        </div>
                                    </>
                                )
                            }
                            <Field label="email" name="email" type="email" onChangeHandler={handleChange} />
                            <Field label="password" name="password" type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} onChangeHandler={handleChange} />
                            {
                                signup && (
                                    <>
                                        <Field label="confirm password" name="confirmPassword" type="password" onChangeHandler={handleChange} />
                                    </>
                                )
                            }

                            <div className={classes.btnContainer} >

                                <div className={classes.btn}>

                                    <Button type="submit" variant="contained" size="large" style={{ marginTop: '10px', backgroundColor: '#8128e3' }}  >
                                        {signup ? 'Sign Up' : 'Sign In'}
                                    </Button>
                                </div>


                                <div className={classes.btn}>
                                    <GoogleLogin
                                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                        render={renderProps => (
                                            <GoogleButton
                                                onClick={renderProps.onClick}
                                                disabled={false}
                                                type='dark'
                                                style={{ backgroundColor: '#8128e3', marginTop: '10px', borderRadius: '5px'}}
                                            >
                                                Login with Google
                                            </GoogleButton>
                                        )}

                                        onSuccess={googleSuccess}
                                        onFailure={googleFailure}

                                        cookiePolicy={'single_host_origin'}
                                    />

                                </div>
                            </div>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {signup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                        <Link to="forgot"><p style={{ textAlign: 'center', color: '#1d7dd6', marginTop: '20px' }}>Forgotten Password?</p></Link>
                    </form>
                </Paper>
            </div>

        </div>
    )
}
