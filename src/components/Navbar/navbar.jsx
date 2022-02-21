import React, { useState, useRef, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { IconButton, Button, Avatar, Popper, MenuList, MenuItem, Paper, Grow } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box'
import { ClickAwayListener } from '@mui/material'


import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'


const useStyles = makeStyles((theme) => ({

    navbar: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
    },
    navLeft: {


    },
    navRight: {


    },
    logo: {
        cursor: 'pointer',
        textShadow: '2px 3px black',
        paddingTop: '8px',


    },
    profileButton: {

        marginRight: '20px',


        /* background-color: #1976d2; */
    },
    dashBoardNavbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '9vh',
        width: '100%',
      
        backgroundColor: '#B3ACE5',

    },
    header: {
        display: 'flex',
        backgroundColor: '#B3ACE5'
    }


}))


export default function Navbar() {

    const navigate = useNavigate();
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    // console.log(location.pathname)
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    ///// ------------------ For Home Navbar --------------------------
    const handleClick = () => {
        navigate('/login');
    }

    const handleLogoClick = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    }
    ///-----------------------------------------------------------------

    /////---------------- For dashboard Navbar ----------------------

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    // useEffect(() => {
    //     setUser(JSON.parse(localStorage.getItem('profile')))
    // }, [location]);



    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        // localStorage.removeItem('profile')
        navigate('/');
        setUser(null)
    }
    useEffect(() => {
        const token = user?.token

        //If token expires, logout the user
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

    }, [location, user]) //when location changes, set the user


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };


    const openLink = (link) => {
        navigate(`/${link}`)
        setOpen(false);
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);





    if (!user) {
        return (

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ backgroundColor:'#110E2E' }}>
                    <Toolbar>
                        <div className={classes.navbar}>
                            <div className={classes.navLeft}>

                              
                                <img src={require('../../images/logo2.png')} alt="" style={{width: '140px' , height: '50px',marginBottom: '10px', cursor: 'pointer', marginTop: '10px' }} onClick={handleLogoClick}/>

                            </div>

                            <div className={classes.navRight}>

                                <IconButton
                                    size="large"
                                    color="inherit"
                                    style={{ margin: '0px 20px', }}
                                >
                                    <GitHubIcon />
                                </IconButton>

                                <Button
                                    size='large'
                                    color='inherit'
                                    onClick={handleClick}
                                    variant="contained"

                                    style={{ backgroundColor: 'rgb(147 125 221)', margin: '15px 20px', }}

                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>

                    </Toolbar>
                </AppBar>
            </Box>
        )


    }
    return (
        <>

            <div className={classes.header}>

                
                <div className={classes.dashBoardNavbar}>
                    <div className={classes.profileButton}>

                        <Button
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                        >
                            <Avatar style={{ backgroundColor: '#63bce5', boxShadow: '2px 3px black' }}>{user?.result?.name?.charAt(0) || user?.existedUser?.name.charAt(0)}</Avatar>
                        </Button>
                    </div>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper elevation={3}>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >
                                            <MenuItem onClick={() => openLink('settings')}>{(user?.result?.name)|| (user?.existedUser?.name)}</MenuItem>
                                            <MenuItem onClick={() => logout()} >Logout</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>


        </>
    )
}
