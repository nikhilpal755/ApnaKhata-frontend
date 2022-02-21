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
           

        
            <div className="main-container" style={{ color: 'purple', margin: '4%' }}>
                
                <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ padding: '4%' }}>Best Record Keeper and Invoicing Application for freelancers and Small Buisnesses</h1>


                    <img src={require('../../images/invoice2.png')} alt="" style={{ height: '500px' }} className='vert-move' />

                </div>
            </div>

        </div>
    )
}
