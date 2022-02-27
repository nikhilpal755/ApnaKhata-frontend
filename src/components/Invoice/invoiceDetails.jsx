import React, { useState } from 'react'

import SideBar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/navbar';
import ReactiveButton from 'reactive-button';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getInvoice } from '../../Actions/invoice';
import initialState from './initialState';


import { Grid, Typography, IconButton, Divider, Container, TableContainer, Table, TableRow, TableCell, InputBase, TableHead, TableBody } from '@mui/material'
import { useEffect } from 'react';
import { saveAs } from 'file-saver'
import moment from 'moment';
import {getProfile} from '../../Actions/profile'

//icons
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import PaymentIcon from '@mui/icons-material/Payment';
import axios from 'axios';
import './invoiceDetails.css';
import AddPayment from '../Payment/addPayment';
import PaymentHistory from '../Payment/PaymentHistory';

const InvoiceDetails = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const { invoice } = useSelector(state => state?.InvoicesReducer);
    const {profiles} = useSelector(state => state?.ProfileReducer);
    // console.log(profiles)
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        buisnessAddress:'',
        businessName: '',

        
    })
    let date = moment().format('MMM Do YYYY');
    // console.log(date)
    
    useEffect(() =>{
        dispatch(getProfile(user?.result?._id || user?.result?.googleId));
    },[]);

    useEffect(() => {
        setProfile(profiles[0]);
    },[profiles])

    const [invoiceData, setInvoiceData] = useState(initialState);
    const [total, setTotal] = useState(0);
    const [subTotal, setSubtotal] = useState(0);
    const [vat, setVat] = useState(0);
    const [currency, setCurrency] = useState('');
    const [rates, setRates] = useState('');
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [dueDate, setDueDate] = useState(date);

    const [client, setClient] = useState('');
    const [company, setCompany] = useState('');

    const [sendInvoiceStatus, setsendInvoiceStatus] = useState('idle');
    const [downloadStatus, setDownLoadStatus] = useState('idle');


    const user = JSON.parse(localStorage.getItem('profile'));

    const[open, setOpen] = useState(false);



    useEffect(() => {
        dispatch(getInvoice(id));
    }, [id, dispatch])

    useEffect(() => {
        if (invoice) {
            setInvoiceData(invoice);
            setTotal(invoice.total);
            setSubtotal(invoice.subTotal);
            setVat(invoice.vat);
            setRates(invoice.rates);
            setCompany(invoice.company);
            setClient(invoice.client);
            setNotes(invoice.notes);
            setStatus(invoice.status);
            setType(invoice.type);
            setDueDate(invoice.dueDate);
            setCurrency(invoice.currency);
        }
    }, [invoice])

    // total amount Recieved
    let totalPaid = 0;
    for (let i = 0; i < invoice?.paymentRecords?.length; i++) {
        totalPaid += Number(invoice?.paymentRecords[i]?.amountPaid);
    }

    // edit invoice
    const editInvoice = () => {
        navigate(`/edit/invoice/${id}`);
    }


    // create and downLoad invoice pdf
    const downLoadClick = () => {
        setDownLoadStatus('loading');
        axios.post(`https://apnakhata01.herokuapp.com/create-pdf`, {
            name: invoice?.client?.name,
            address: invoice?.client?.address,
            email: invoice?.client?.email,
            phoneNumber: invoice?.client?.phoneNumber,
            dueDate: invoice?.dueDate,
            currency: invoice?.currency,
            date: invoice.createdAt,
            id: invoice?.recordNumber,
            notes: invoice?.notes,
            subTotal: parseFloat(invoice?.subTotal).toFixed(2),
            total: parseFloat(invoice?.total).toFixed(2),
            type: invoice?.type,
            status: invoice?.status,
            vat: invoice?.vat,
            rates: invoice?.rates,
            items: invoice?.items,
            totalAmountReceived: parseFloat(totalPaid).toFixed(2),
            balanceDue: parseFloat(invoice?.total - totalPaid).toFixed(2),
            company: profile,
            link: `https://apnakhata.netlify.app/invoice/${invoice?._id}`
        }).then(() => axios.get('https://apnakhata01.herokuapp.com/get-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdf = new Blob([res.data], { type: 'application/pdf' });
                console.log(pdf)
                saveAs(pdf, 'invoice.pdf')
            }).then(() => setDownLoadStatus('success'))
            .catch(err => {
                console.log(err);
                setDownLoadStatus('error');
            })
    }


    // send to customer
    const sendInvoice = () => {
        setsendInvoiceStatus('loading');
        axios.post('https://apnakhata01.herokuapp.com/send-pdf', {
            name: invoice?.client?.name,
            address: invoice?.client?.address,
            phone: invoice?.client?.phone,
            email: invoice?.client?.email,
            id: invoice?.recordNumber,
            date: invoice?.createdAt,
            dueDate: invoice?.dueDate,
            notes: invoice?.notes,
            subTotal: parseFloat(invoice?.subTotal).toFixed(2),
            total: parseFloat(invoice?.total).toFixed(2),
            type: invoice?.type,
            status: invoice?.status,
            currency: invoice?.currency,
            vat: invoice?.vat,
            rates: invoice?.rates,
            items: invoice?.items,
            totalAmountReceived: parseFloat(totalPaid).toFixed(2),
            balanceDue: parseFloat(invoice?.total - totalPaid).toFixed(2),
            company: profile,
            link: `https://apnakhata.netlify.app/invoice/${invoice?._id}`
        })
            .then(() => setsendInvoiceStatus('success'))
            .catch(err => {
                console.log(err);
                setsendInvoiceStatus('error');
            })
    }

    function checkStatus() {
        return totalPaid >= total ? "green"
            : status === "Partial" ? "#1976d2"
                : status === "Paid" ? "green"
                    : status === "Unpaid" ? "red"
                        : "red";
    }

    return (

        <>
            <div style={{ width: '100vw', height: '100vh', maxWidth: '100%', backgroundColor: '#B3ACE5', overflowY: 'scroll' }}>
                <div className="sidebar" style={{ position: 'fixed' }}>
                    <SideBar />
                </div>
                <div className="navbar" >
                    <Navbar />
                </div>


                <div className="invoiceDetails" style={{ padding: '3%', marginLeft: '80px' }}>

                    <Grid container justifyContent="space-evenly" >

                        <Grid item>

                            <ReactiveButton
                                color='violet'
                                style={{ height: '70px', width: '200px' }}
                                size='large'
                                shadow
                                rounded
                                buttonState={downloadStatus}
                                idleText={<div style={{ display: 'flex', color: 'whitesmoke' }}>
                                    <Typography variant='h6' style={{ fontSize: '18px' }} >Download Invoice</Typography>
                                    <IconButton style={{ color: 'whitesmoke' }}>
                                        <DownloadIcon style={{ fontSize: '1.5rem' }} />
                                    </IconButton>
                                </div>}
                                loadingText='DownLoading...'
                                onClick={downLoadClick}
                                successText='Done'
                            />
                        </Grid>
                        <Grid item>

                            <ReactiveButton
                                color='violet'
                                style={{ height: '70px', width: '200px' }}
                                size='large'
                                shadow
                                rounded
                                buttonState={sendInvoiceStatus}
                                idleText={
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'whitesmoke' }}>
                                        <Typography variant='h6' style={{ fontSize: '18px' }} >Send Invoice</Typography>
                                        <IconButton style={{ color: 'whitesmoke' }}>
                                            <SendIcon style={{ fontSize: '1.5rem' }} />
                                        </IconButton>
                                    </div>
                                }
                                loadingText='Sending...'
                                onClick={sendInvoice}
                                successText='Sended Successfully'
                            />
                        </Grid>
                        <Grid item>

                            <ReactiveButton
                                color='violet'
                                style={{ height: '70px', width: '200px' }}
                                size='large'
                                shadow
                                rounded
                                buttonState={'idle'}
                                idleText={
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'whitesmoke' }}>
                                        <Typography variant='h6' style={{ fontSize: '18px' }} >Edit Invoice</Typography>
                                        <IconButton style={{ color: 'whitesmoke' }}>
                                            <EditIcon style={{ fontSize: '1.5rem' }} />
                                        </IconButton>
                                    </div>
                                }

                                onClick={editInvoice}

                            />
                        </Grid>
                        <Grid item>

                            <ReactiveButton
                                color='violet'
                                style={{ height: '70px', width: '200px' }}
                                size='large'
                                shadow
                                rounded
                                buttonState={'idle'}
                                idleText={
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'whitesmoke' }}>
                                        <Typography variant='h6' style={{ fontSize: '18px' }} >Add Payment</Typography>
                                        <IconButton style={{ color: 'whitesmoke' }}>
                                            <PaymentIcon style={{ fontSize: '1.5rem' }} />
                                        </IconButton>
                                    </div>
                                }
                        
                                onClick={() => setOpen(true)}
                                
                            />
                        </Grid>

                    </Grid>
                    {
                        open && <AddPayment open={open} setOpen={setOpen} invoice={invoice}/>
                    }
                    {
                        invoice?.paymentRecords?.length > 0 &&
                        <PaymentHistory paymentRecords={invoice?.paymentRecords}/>
                    }

                    <div style={{ marginTop: '10%' }} className="invoiceLayout">

                        <Grid container justifyContent="space-between" style={{ padding: '10px 30px' }}>
                            {
                                !invoice?.creator?.includes(user?.result._id || user?.result.googleId) ?
                                    (<Grid item>
                                    </Grid>)

                                    : (
                                        <Grid item onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }}>
                                            {profile?.logo ? <img src={profile?.logo} alt="" className='logo' style={{height:'120px'}} />
                                                : <img src={require('../../images/logo2.png')} alt="" style={{ width: '140px', height: '50px', marginTop: '20px' }} />}

                                        </Grid>
                                    )
                            }

                            <Grid item style={{ marginRight: 40, textAlign: 'right' }}>
                                <Typography style={{ lineSpacing: 1, fontSize: 45, fontWeight: 700, color: 'gray' }} >{Number(total - totalPaid) <= 0 ? 'Receipt' : type}</Typography>
                                <Typography variant="overline" style={{ color: 'gray' }} >No: </Typography>
                                <Typography variant="body2">{invoiceData?.recordNumber}</Typography>
                            </Grid>

                        </Grid>

                        <Divider />
                        <Container>
                            <Grid container justifyContent="space-between" style={{ marginTop: '40px', marginBottom: '30px' }} >
                                <Grid item>
                                    {invoice?.creator?.includes(user?.result._id || user?.result?.googleId) && (
                                        <Container style={{ marginBottom: '20px' }}>
                                            <Typography variant="overline" style={{ color: 'gray' }} gutterBottom>From</Typography>
                                            <Typography variant="subtitle2">{profile?.businessName}</Typography>
                                            <Typography variant="body2">{profile?.email}</Typography>
                                            <Typography variant="body2">{profile?.phoneNumber}</Typography>
                                            <Typography variant="body2" gutterBottom>{profile?.buisnessAddress}</Typography>
                                        </Container>
                                    )}
                                    <Container>
                                        <Typography variant="overline" style={{ color: 'gray', paddingRight: '3px' }} gutterBottom>Bill to: </Typography>
                                        <Typography variant="subtitle2" gutterBottom>{client?.name}</Typography>
                                        <Typography variant="body2" >{client?.email}</Typography>
                                        <Typography variant="body2" >{client?.phoneNumber}</Typography>
                                        <Typography variant="body2">{client?.address}</Typography>
                                    </Container>
                                </Grid>

                                <Grid item style={{ marginRight: 20, textAlign: 'right' }}>
                                    <Typography variant="overline" style={{ color: 'gray' }} gutterBottom>Status: </Typography>
                                    <Typography variant="h6" gutterBottom style={{ color: checkStatus() }}>{totalPaid >= total ? 'Paid' : status}</Typography>
                                    <Typography variant="overline" style={{ color: 'gray' }} gutterBottom>Date: </Typography>
                                    <Typography variant="body2" gutterBottom>{moment().format("MMM Do YYYY")}</Typography>
                                    <Typography variant="overline" style={{ color: 'gray' }} gutterBottom>Due Date: </Typography>
                                    <Typography variant="body2" gutterBottom>{dueDate ? dueDate : 'No due Date'}</Typography>
                                    <Typography variant="overline" gutterBottom>Amount: </Typography>
                                    <Typography variant="h6" gutterBottom>{currency} {parseFloat(total).toFixed(2)}</Typography>
                                </Grid>
                            </Grid>
                        </Container>

                        <Divider />

                        <div className="itemsContainer">
                            <TableContainer style={{ maxWidth: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: ' 5% 10%' }}>
                                <Table className="table" >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Item</TableCell>
                                            <TableCell >Qty</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell >Disc(%)</TableCell>
                                            <TableCell >Amount</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {invoiceData?.items?.map((itemField, index) => (
                                            <TableRow key={index}>
                                                <TableCell scope="row" style={{ width: '40%' }}> <InputBase style={{ width: '100%' }} outline="none" sx={{ ml: 1, flex: 1 }} type="text" name="itemName" value={itemField.itemName} placeholder="Item name or description" readOnly /> </TableCell>

                                                <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="quantity" value={itemField?.quantity} placeholder="0" readOnly /> </TableCell>

                                                <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="unitPrice" value={itemField?.unitPrice} placeholder="0" readOnly /> </TableCell>

                                                <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="discount" value={itemField?.discount} readOnly /> </TableCell>

                                                <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="amount" value={parseFloat((itemField?.quantity * itemField.unitPrice) - (itemField.quantity * itemField.unitPrice) * itemField.discount / 100).toFixed(2)} readOnly /> </TableCell>


                                            </TableRow>
                                        ))}
                                    </TableBody>

                                </Table>


                            </TableContainer>


                            <div className="invoiceSummary" style={{marginBottom: '5%'}}>
                                <div className={"summary"}>Invoice Summary</div>
                                <div className={"summaryItem"}>
                                    <p>Subtotal:</p>
                                    <h4>{parseFloat(subTotal).toFixed(2)}</h4>
                                </div>
                                <div className={"summaryItem"}>
                                    <p>{`VAT(${rates}%):`}</p>
                                    <h4>{vat}</h4>
                                </div>
                                <div className={"summaryItem"}>
                                    <p>Total</p>
                                    <h4>{currency} {parseFloat(total).toFixed(2)}</h4>
                                </div>
                                <div className={"summaryItem"}>
                                    <p>Paid</p>
                                    <h4>{currency} {parseFloat(totalPaid).toFixed(2)}</h4>
                                </div>

                                <div className={"summaryItem"}>
                                    <p>Balance</p>
                                    <h4 style={{ color: "black", fontSize: "18px", lineHeight: "8px" }}>{currency} {parseFloat(total - totalPaid).toFixed(2)}</h4>
                                </div>

                            </div>

                            {/* <Divider/> */}

                            <div className="note" style={{margin: '2%'}}>
                                <Typography variant="overline" component="h4" style={{textAlign: 'left'}}>Notes/Terms</Typography>
                                <Typography style={{backgroundColor: 'whitesmoke', width: '100%'}}>{invoiceData?.notes}</Typography>
                            </div>

                        </div>


                    </div>
                </div>

            </div>


        </>
    )
};

export default InvoiceDetails;
