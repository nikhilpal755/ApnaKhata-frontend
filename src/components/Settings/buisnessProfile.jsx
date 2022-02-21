import React from 'react'
import SideBar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/navbar'

import Form from './form/form'
import './buisnessProfile.css'
export default function Profile() {

    const user = JSON.parse(localStorage.getItem('profile'))
    return (
        <div>
            <div className='dashBoard' style={{ width: '100vw', height: '100vh', maxWidth: '100%', backgroundColor: '#B3ACE5', overflowY: 'auto' }}>

                <div className="sidebar" style={{ position: 'fixed' }}>
                    <SideBar />
                </div>
                <div className="navbar" >
                    <Navbar />
                </div>
                <div className="buisnessProfile">
                    <section className={"hero"}>
                        <h1> Buisness Profile Settings</h1>
                        <div className={"paragraph"}>
                            <p>Edit/ update your business profile</p>
                        </div>
                    </section>
                    <section className={"stat"}>
                        <Form user={user} />
                    </section>
                </div>
            </div>


        </div>
    )
}
