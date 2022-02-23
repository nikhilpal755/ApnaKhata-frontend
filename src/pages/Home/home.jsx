import React from 'react'
import Navbar from '../../components/Navbar/navbar'

import Dashboard from '../Dashboard/dashboard';

import './home.css'
// #bac5e1
export default function Home() {

    const user = localStorage.getItem('profile');


    if (user) {
        return <Dashboard />;

    }

    return (
        <div className='home background' style={{overflowY: 'hidden'}} >
            <Navbar />
            
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
           

        
            <div className="main-container" style={{ color: 'rgb(17, 14, 46)', margin: ' 2% 4%', fontFamily: "fantasy", letterSpacing: '3px', fontWeight: 'lighter', fontSize: '30px' }}>
                
                <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding : '3%' }}>  
                    <h1 style={{ padding: '4%' }}>THE ONE STOP DESTINATION FOR SMALL BUISNESSES AND FREELANCERS</h1>


                    <img src={"https://res.cloudinary.com/dcfg8797j/image/upload/v1645624299/Untitled_design_4_uygf42.png"} alt="" style={{ height: '500px' }} className='vert-move' />

                </div>
            </div>

        </div>
    )
}
