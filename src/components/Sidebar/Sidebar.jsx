import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom'

import { ProSidebar, Menu, MenuItem, SidebarContent, SidebarFooter, SidebarHeader } from 'react-pro-sidebar';
import {Typography} from '@mui/material'
import { Button } from '@mui/material'
import 'react-pro-sidebar/dist/css/styles.css';

import LayersIcon from '@mui/icons-material/Layers';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import GitHubIcon from '@mui/icons-material/GitHub';


import './styles.scss';

export default function SideBar() {


    const location = useLocation()

    const [expandCollapse, setExpandCollapse] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const navigate = useNavigate();




    const expandCollapseSidebar = () => {
        setExpandCollapse(!expandCollapse);

    }


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    if (!user) return null


    return (
        <>
            <ProSidebar collapsed={!expandCollapse} className="sidebar" style={{ height: '100vh', color: '#B3ACE5' , zIndex: '100'}}>

                <SidebarHeader>

                    <div className="logo" style={{ display: 'flex', justifyContent: 'space-between' }}>

                        {expandCollapse && <>

                            <h1 style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}> <img src={require('../../images/logo2.png')} alt="" style={{width: '140px' , height: '50px',marginBottom: '10px' , marginTop: '-10px'}}/></h1>

                        </>}
                        <Button onClick={expandCollapseSidebar} style={{ color: 'white', marginBottom: '30px', marginTop: '20px', marginLeft: '8px' }}>
                            {!expandCollapse ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
                        </Button>
                    </div>
                </SidebarHeader>


                <SidebarContent>

                    <Menu iconShape="square" >
                        <MenuItem icon={<HomeIcon />} onClick={() => navigate('/dashboard')}><Typography variant='overline'> Dashboard</Typography></MenuItem>

                        <MenuItem icon={<CreateIcon />} onClick={() => navigate('/invoice')}> <Typography variant='overline'> Create </Typography></MenuItem>
                        <MenuItem icon={<LayersIcon />} onClick={() => navigate('/invoices')}><Typography variant='overline'> Invoices </Typography></MenuItem>
                        <MenuItem icon={<GroupIcon />} onClick={() => navigate('/customers')}><Typography variant='overline'> Customers</Typography></MenuItem>


                    </Menu>

                </SidebarContent>

                <SidebarFooter>

                    <Menu iconShape="circle">
                        <MenuItem icon={<SettingsIcon />} onClick={() => navigate('/settings')}><Typography variant='overline'> Settings </Typography></MenuItem>

                        <MenuItem icon={<GitHubIcon />}> <Typography variant='overline'> Source Code</Typography> </MenuItem>


                    </Menu>


                </SidebarFooter>


            </ProSidebar>



        </>

    );
}
