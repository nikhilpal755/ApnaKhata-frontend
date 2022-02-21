import React, { useEffect, useState } from 'react'

import SideBar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/navbar'
import { useDispatch } from 'react-redux'
import { getInvoicesByUser } from '../../Actions/invoice';


import { useSelector } from 'react-redux';
import { Grid, Table, TableContainer, TableHead, TableBody, TableCell, Paper, TableRow, IconButton, TableFooter, TablePagination, Snackbar , Alert} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useNavigate } from 'react-router-dom';
import { deleteInvoice } from '../../Actions/invoice';
import Pagination from './pagination';

import { CircularProgress } from '@mui/material';
import FabFooter from '../../components/Footer/fab'

export default function Invoices() {

    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openSnackBar, setOpenSnackBar] = useState(false);


    useEffect(() => {
        dispatch(getInvoicesByUser(user?.result?._id || user?.result?.googleId));
    }, [dispatch])


    const { invoices, isLoading } = useSelector(state => state?.InvoicesReducer);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(0);


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, invoices.length - page * rowsPerPage);

    // console.log(invoices)
    const headerStyle = {
        borderBottom: 'none', textAlign: 'center'
    }


    const tableStyle = {
        width: 160,
        fontSize: 14,
        cursor: 'pointer',
        borderBottom: 'none',
        padding: '6px',
        textAlign: 'center'
    }

    if (invoices?.length === 0) {
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', backgroundColor: '#d9c8ff', height: '100vh', width: '100vw' }}>
            <p style={{ padding: '40px', color: 'gray', textAlign: 'center' }}>Fetching your invoices... </p>
            <CircularProgress size={200} className="buttonProgress" color='secondary' />

        </div>
    }

    const checkStatus = (status) => {
        return status === "Partial" ? { backgroundColor: '#baddff', padding: '8px 18px' }
            : status === "Paid" ? { backgroundColor: '#a5ffcd', padding: '8px 18px' }
                : status === "Unpaid" ? { backgroundColor: '#ffaa91', padding: '8px 18px', }
                    : "red";

    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClose = () => {

        setOpenSnackBar(false);
        window.location.reload();
      }
    
    




    return (
        <>
            <div className='dashBoard' style={{ width: '100vw', height: '100vh', maxWidth: '100%', backgroundColor: '#B3ACE5', overflowY: 'auto' }}>

                <div className="sidebar" style={{ position: 'fixed' }}>
                    <SideBar />
                </div>
                <div className="navbar" >
                    <Navbar />
                </div>

                <div className="allInvoices" style={{ margin: 'auto 0px', marginLeft: '15%' }}>

                    <Grid container style={{ width: '85%', paddingTop: '50px', paddingBottom: '50px', border: 'none' }} justifyContent={'center'}>
                        <TableContainer component={Paper} elevation={0}>
                            <Table className="table" aria-label="custom pagination table">

                                <TableHead>
                                    <TableRow>
                                        <TableCell style={headerStyle}>InvoiceNumber</TableCell>
                                        <TableCell style={headerStyle}>Client</TableCell>
                                        <TableCell style={headerStyle}>Amount</TableCell>
                                        <TableCell style={headerStyle}>Due Date</TableCell>
                                        <TableCell style={headerStyle}>Status</TableCell>
                                        <TableCell style={headerStyle}>Edit</TableCell>
                                        <TableCell style={headerStyle}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>

                                    {(rowsPerPage > 0 ? invoices?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : invoices).map((invoice) => {
                                        return (
                                            <>
                                                <TableRow key={invoice._id}>
                                                    <TableCell style={tableStyle} component="tr" scope="row" onClick={() => navigate(`/invoice/${invoice._id}`)}>
                                                        {invoice.recordNumber}
                                                    </TableCell>

                                                    <TableCell style={tableStyle} component="tr" scope="row" onClick={() => navigate(`/invoice/${invoice._id}`)}>{invoice.client?.name}</TableCell>

                                                    <TableCell style={tableStyle} component="tr" scope="row" onClick={() => navigate(`/invoice/${invoice._id}`)}>{invoice.currency} {invoice.total}</TableCell>

                                                    <TableCell style={tableStyle} component="tr" scope="row" onClick={() => navigate(`/invoice/${invoice._id}`)}>{invoice.dueDate}</TableCell>

                                                    <TableCell style={checkStatus(invoice.status)} component="tr" scope="row" onClick={() => navigate(`/invoice/${invoice._id}`)}> {invoice.status}</TableCell>

                                                    <TableCell style={tableStyle} component="tr" scope="row">
                                                        <IconButton onClick={() => navigate(`/edit/invoice/${invoice._id}`)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </TableCell>

                                                    <TableCell style={tableStyle} component="tr" scope="row" >
                                                        <IconButton onClick={() => dispatch(deleteInvoice(invoice._id, setOpenSnackBar))}>
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
                                        openSnackBar && (
                                            <>
                                                <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleClose}>
                                                    <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                                                        Invoice deleted successfully
                                                    </Alert>
                                                </Snackbar>
                                            </>
                                        )
                                    }

                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[{ label: 'All', value: -1 }, 5, 10, 25]}
                                            colSpan={6}
                                            count={Math.floor(invoices.length)}
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
                </div>
                <section className="fabIcon" style={{ position: 'fixed', top: '85vh', left: '90vw' }}>
                    <FabFooter />

                </section>


            </div>
        </>
    )
}
