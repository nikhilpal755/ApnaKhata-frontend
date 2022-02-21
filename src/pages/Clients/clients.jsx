import React, { useState, useEffect } from 'react'
import SideBar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/navbar'

import { useDispatch } from 'react-redux'
import { getClientsOfUser } from '../../Actions/client'



import { useSelector } from 'react-redux';
import { Grid, Table, TableContainer, TableHead, TableBody, TableCell, Paper, TableRow, IconButton, TableFooter, TablePagination } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useNavigate } from 'react-router-dom';
import {deleteClient} from '../../Actions/client';
import Pagination from '../Invoices/pagination'

import { CircularProgress } from '@mui/material'
import AddClient from '../../components/Invoice/addClient'
import FabFooter from '../../components/Footer/fab'

export default function Clients() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getClientsOfUser(user.result._id || user.result.googleId));
    }, [dispatch])



    const { clients, isLoading } = useSelector(state => state?.ClientReducer);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, clients.length - page * rowsPerPage);

    const [clientState, setClientState] = useState(null);
    const [open, setOpen] = useState(false);


    const headerStyle = {
        borderBottom: 'none', textAlign: 'center'
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const tableStyle = {
        width: 160,
        fontSize: 14,
        cursor: 'pointer',
        borderBottom: 'none',
        padding: '6px',
        textAlign: 'center'
    }

    // const handleEditClient = (client) =>{
    //     setClientState(client);
    //     setOpen(!open);

    // }



    // console.log(clients)

    if (clients?.length === 0) {
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', height: '100vh' ,widht: '100vw', backgroundColor: '#d9c8ff' }}>
            <p style={{ padding: '40px', color: 'gray', textAlign: 'center' }}>Fetching your Clients... </p>
            <CircularProgress size={200} className="buttonProgress" color='secondary' />

        </div>
    }
    return (
        <div>
            <div className='dashBoard' style={{ width: '100vw', height: '100vh', maxWidth: '100%', backgroundColor: '#B3ACE5', overflowY: 'auto' }}>

                <div className="sidebar" style={{ position: 'fixed' }}>
                    <SideBar />
                </div>
                <div className="navbar" >
                    <Navbar />
                </div>

                <section className="customers" style={{ margin: 'auto 0px', marginLeft: '15%' }}>

                    <Grid container style={{ width: '85%', paddingTop: '50px', paddingBottom: '50px', border: 'none' }} justifyContent={'center'}>
                        <TableContainer component={Paper} elevation={0}>
                            <Table className="table" aria-label="custom pagination table">

                                <TableHead>
                                    <TableRow>
                                        <TableCell style={headerStyle}>Client</TableCell>
                                        <TableCell style={headerStyle}>Email</TableCell>
                                        <TableCell style={headerStyle}>Address</TableCell>
                                        <TableCell style={headerStyle}>Phone</TableCell>
                                        {/* <TableCell style={headerStyle}></TableCell> */}
                                        <TableCell style={headerStyle}>Edit</TableCell>
                                        <TableCell style={headerStyle}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                
                            <TableBody>

                                {(rowsPerPage > 0 ? clients?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : clients).map((client) => {
                                    return (
                                        <>
                                            <TableRow key={client._id}>
                                                <TableCell style={tableStyle} component="tr" scope="row" >
                                                    {client?.name}
                                                </TableCell>

                                                <TableCell style={tableStyle} component="tr" scope="row" >{client?.email}</TableCell>

                                                <TableCell style={tableStyle} component="tr" scope="row" > {client?.address}</TableCell>

                                                <TableCell style={tableStyle} component="tr" scope="row" > {client?.phoneNumber}</TableCell>

                                                <TableCell style={tableStyle} component="tr" scope="row"
                                                onClick={() =>{
                                                    setClientState(client);
                                                    setOpen(!open);
                                                }}>
                                                    <IconButton >
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>

                                                <TableCell style={tableStyle} component="tr" scope="row" >
                                                    <IconButton onClick={() => dispatch(deleteClient(client._id))}>
                                                        <DeleteForeverIcon />
                                                    </IconButton>
                                                </TableCell>

                                            </TableRow>
                                        </>



                                    )

                                })}

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                                {
                                    clientState && open && <AddClient open={open} setOpen={setOpen} client={clientState} />
                                }
                            </TableBody>
                                <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25,{ label: 'All', value: -1 }]}
                                        colSpan={6}
                                        count={Math.floor(clients.length)}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={Pagination}
                                    />
                                </TableRow>
                            </TableFooter>
                            </Table>
                        </TableContainer>



                    </Grid>


                </section>

                <section className="fabIcon" style={{position: 'fixed', top: '85vh', left: '90vw'}}>
                 <FabFooter />

              </section>


            </div>

        </div>
    )
}
