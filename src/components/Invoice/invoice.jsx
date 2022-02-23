import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/navbar';
import SideBar from '../../components/Sidebar/Sidebar';
import AddClient from './addClient';
import InvoiceType from './invoiceType';

import { Grid, Typography, InputBase, Divider, Button, Autocomplete, TextField, Paper, Chip, Table, TableBody, TableHead, TableCell, TableContainer, TableRow, IconButton } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import './invoice.css'
import { useSelector } from 'react-redux';
import { getClientsOfUser } from '../../Actions/client';
import { getInvoice } from '../../Actions/invoice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FabFooter from '../Footer/fab';

import moment from 'moment'
import { currencies } from 'currencies.json'

import { updateInvoice } from '../../Actions/invoice';
import { createInvoice } from '../../Actions/invoice';

import axios from 'axios'
import initialState from './initialState';


export default function Invoice() {

  const [open, setOpen] = useState(false);// to add client
  const [type, setType] = useState('Invoice');// to select invoice type

  const [client, setClient] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  let date = moment().format('MMM Do YYYY');
  const { id } = useParams();

  
  const navigate = useNavigate();



  const clients = useSelector(state => state?.ClientReducer?.clients);
  let { invoice, isLoading } = useSelector(state => state?.InvoicesReducer);
  isLoading = false;

  


  



  // invoice list variables
  const [invoiceData, setInvoiceData] = useState(initialState);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [currency, setCurrency] = useState(currencies[0].symbol);
  const [rates, setRates] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');

  const [val, setVal] = useState(new Date())



  const [dueDate, setDueDate] = useState(date);








  useEffect(() => {

    dispatch(getClientsOfUser(user?.result._id || user?.result.googleId || user?.existedUser._id));

  }, [])

  useEffect(() => {
    dispatch(getInvoice(id));
  }, [id])




  useEffect(() => {

    if (invoice) {

      //Automatically set the default invoice values as the ones in the invoice to be updated
      setInvoiceData(invoice);
      setStatus(invoice.status);
      setCurrency(invoice.currency);
      setRates(invoice.rates);
      setNotes(invoice.notes);

      setTotal(invoice.total);
      setClient(invoice.client);
      setDueDate(invoice.dueDate);


    }

  }, [invoice])


  useEffect(() => {
    const updateSubTotal = () => {
      let sum = 0;

      let items_amount = document.getElementsByName("amount");
      for (let i = 0; i < items_amount.length; i++) {
        sum += parseFloat(items_amount[i].value);
      }

      setSubtotal(parseFloat(sum).toFixed(2));
      setTotal(parseFloat(sum).toFixed(2));

    };
    updateSubTotal();

  }, [invoiceData])


  useEffect(() => {
    const total = () => {

      let sum = parseFloat(subTotal) + parseFloat((subTotal * rates) / 100);

      setTotal(parseFloat(sum).toFixed(2));
      setVat(rates);

    }
    total();


  }, [invoiceData, rates, subTotal])



  useEffect(() => {
    if (type === 'Receipt') {
      setStatus('Paid')
    } else {
      setStatus('Unpaid')
    }
  }, [type])


  const CustomPaper = (props) => {
    return <Paper elevation={3} {...props} />;
  };
  const clientsProps = {
    options: clients,
    getOptionLabel: (option) => option.name
  };

  const currenciesProps = {
    options: currencies,
    getOptionLabel: (option) => option.name + ' (' + option.symbol + ')'
  }

  const onChangeHandler = (e, index) => {
    e.preventDefault();
    const entries = [...invoiceData.items];
    entries[index][e.target.name] = e.target.value;
    setInvoiceData({ ...invoiceData, items: entries });
  }

  const handleRemoveField = (index) => {
    const entries = [...invoiceData.items];
    entries.splice(index, 1);
    setInvoiceData({ ...invoiceData, items: entries });

  }

  const addField = (e) => {
    e.preventDefault()
    const entries = [...invoiceData.items];
    entries.push({ itemName: '', unitPrice: '', quantity: '', discount: '' });
    setInvoiceData({ ...invoiceData, items: entries });

  }


  let entriesAmount = (quantity, unitPrice, discount) => {
    let amount = quantity * unitPrice - (quantity * unitPrice * discount / 100);
    return parseFloat(amount).toFixed(2);

  }




  const handleSubmit = async(e) => {
    e.preventDefault();

    if (invoice) {// if invoice is already present , then just update it
      dispatch(updateInvoice(invoice._id, {
        ...invoiceData,
        subTotal: subTotal,
        total: total,
        vat: vat,
        rates: rates,
        currency: currency,
        dueDate: dueDate,
        status: status,
        client: client,
        type: type,
      }))
      navigate(`/invoice/${invoice._id}`)


    } else {// create a new one
      // dispatch(createInvoice({
      //   ...invoiceData,
      //   subTotal: subTotal,
      //   total: total,
      //   vat: vat,
      //   rates: rates,
      //   currency: currency,
      //   dueDate: dueDate,
      //   status: status,
      //   client: client,
      //   type: type,
      //   paymentRecords: [],
      //   creator: user?.result._id || user?.result.googleId || user?.existedUser._id,
      // }))

     const {data} = await axios.post('https://apnakhata01.herokuapp.com/records', {
        ...invoiceData,
        subTotal: subTotal,
        total: total,
        vat: vat,
        rates: rates,
        currency: currency,
        dueDate: dueDate,
        status: status,
        client: client,
        type: type,
        paymentRecords: [],
        creator: user?.result._id || user?.result.googleId || user?.existedUser._id,
      }) 
      dispatch({type: 'START_LOADING'});
      dispatch({type: 'CREATE_INVOICE', payload: data})
      
      
      setTimeout(() => {
        dispatch({type: 'STOP_LOADING'});
        navigate(`/invoice/${data._id}`);
      }, 2000);

      
    




    }

  }



  return (
    <>
      <div style={{ width: '100vw', height: '100vh', maxWidth: '100%', backgroundColor: '#B3ACE5', overflowY: 'auto' }}>
        <div className="sidebar" style={{ position: 'fixed' }}>
          <SideBar />
        </div>
        <div className="navbar" >
          <Navbar />
        </div>


        <div className="invoiceLayout" style={{ padding: '4%', width: "63%", marginTop:'5%', marginBottom: '5%' }}>
          <form onSubmit={handleSubmit} noValidate >
            <AddClient open={open} setOpen={setOpen} />

            {/* //head part of the Invoice layout */}
            <Grid container justifyContent="space-between" className="invoiceHeader">
              <Grid item>
                <Typography variant='overline' component={'div'} style={{ fontSize: '40px' }}>{type}</Typography>

              </Grid>

              <Grid item>
                <div style={{ marginTop: '20px', marginBottom: '30px' }}>
                  <InvoiceType type={type} setType={setType} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Typography variant="overline" style={{ color: 'gray' }} >Invoice#: </Typography>
                  <InputBase defaultValue={invoiceData.recordNumber} style={{ backgroundColor: 'whitesmoke' }} />
                </div>


              </Grid>

            </Grid>

            <Divider />



            {/* //body part of the Invoice layout */}

            <Grid container justifyContent="space-between" className="invoiceBody">

              <Grid item style={{ display: 'flex', flexDirection: 'column', margin: '15px' }}>
                {/* Bill to  */}
                <Typography variant="overline"> Bill To: </Typography>

                {client && (
                  <>
                    <Typography variant="subtitle2" style={{ marginTop: '10px' }}>{client.name}</Typography>
                    <Typography variant="body2" style={{ color: 'gray' }}>{client.email}</Typography>
                    <Typography variant="body2" style={{ color: 'gray' }}>{client.phoneNumber}</Typography>
                    <Typography variant="body2" style={{ color: 'gray' }}>{client.address}</Typography>
                    <Button color="primary" size="small" style={{ textTransform: 'none', margin: '10px' }} onClick={() => setClient(null)}>Change</Button>
                  </>
                )}

                <div style={client ? { display: 'none' } : { display: 'block' }}>

                  <Autocomplete
                    {...clientsProps}
                    PaperComponent={CustomPaper}
                    renderInput={(params) => <TextField {...params}
                      required={!invoice && true}
                      label="Select Customer"
                      margin="normal"

                      variant="outlined"
                    />}
                    value={clients?.name}
                    onChange={(event, value) => setClient(value)}

                    style={{ width: '250px' }}

                  />

                </div>


                {!client && <>
                  <Chip
                    avatar={<AddIcon />}
                    label="New customer"
                    onClick={() => setOpen(true)}
                    variant="contained"
                  />
                </>
                }


              </Grid>




              {/* Status and due date of invoice */}

              <Grid item>
                <div style={{ margin: '15px', marginRight: '20px', textAlign: 'right' }}>

                  <Typography variant="overline"> Status: </Typography>
                  <Typography variant="h5" gutterBottom style={{ color: type === 'Receipt' ? 'green' : 'red' }}>{type === 'Receipt' ? 'Paid' : 'Unpaid'}</Typography>
                  <Typography variant="overline" gutterBottom> Date:  </Typography>
                  <Typography variant='h6' gutterBottom > {date}</Typography>
                  <Typography variant="overline" gutterBottom> Due Date:  </Typography>

                  <Typography variant='h6' gutterBottom > {dueDate}</Typography>
                  <Typography variant='overline' gutterBottom> Amount:  </Typography>
                  <Typography variant='h6' gutterBottom > {currency} {total}</Typography>


                </div>

              </Grid>





            </Grid>

            <Divider />


            {/* Items List section*/}

            <Grid container justifyContent="center" className="invoiceBody" style={{ marginTop: '40px' }}>
              <TableContainer component={Paper}>

                <Table aria-label="simple table" className="table">
                  <TableHead className='th'>
                    <TableRow className='tr'>
                      <TableCell>Item</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      invoiceData.items.map((field, index) => (

                        <TableRow key={index} className='tr'>
                          <TableCell scope='row' style={{ width: '20%' }} className='td'>
                            <InputBase type='text' style={{ width: '100%' }} sx={{ ml: 1, flex: 1 }}
                              name='itemName' value={field.itemName} onChange={(e) => onChangeHandler(e, index)}
                              placeholder="item name" />
                          </TableCell>

                          <TableCell align="right" className='td'> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="quantity" onChange={e => onChangeHandler(e, index)} value={field.quantity} placeholder="0" /> </TableCell>
                          <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="unitPrice" onChange={e => onChangeHandler(e, index)} value={field.unitPrice} placeholder="0" /> </TableCell>
                          <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="discount" onChange={e => onChangeHandler(e, index)} value={field.discount} placeholder="0" /> </TableCell>

                          <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="amount" onChange={e => onChangeHandler(e, index)} value={entriesAmount(field.quantity, field.unitPrice, field.discount)} disabled />
                          </TableCell>

                          <TableCell align="right">
                            <IconButton onClick={() => handleRemoveField(index)}>
                              <DeleteIcon style={{ width: '20px', height: '20px', color: 'red' }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>

                  <div className="addButton" >
                    <button onClick={addField}>+</button>
                  </div>



                </Table>


              </TableContainer>


            </Grid>


            <div className="invoiceSummary" style={{ marginTop: '6%', marginBottom: '3%' }}>
              <div className="summary">Invoice Summary</div>
              <div className="summaryItem">
                <p>Sub total:</p>
                <h4>{currency} {subTotal}</h4>
              </div>
              <div className="summaryItem">
                <p>GST/VAT(%):</p>
                <h4>{vat}</h4>
              </div>
              <div className="summaryItem">
                <p>Total</p>
                <h4 style={{ color: "black", fontSize: "18px", lineHeight: "8px" }}>{currency} {total.toLocaleString()}</h4>
              </div>

            </div>

            <section className='toolbar'>
              <Grid container justifyContent="space-between">
                <Grid item style={{ marginTop: '10px' }} >
                  <TextField
                    type="text"
                    name="rates"
                    id="rates"
                    value={rates}
                    onChange={(e) => {
                      setRates(e.target.value)
                      // setVat(e.target.value)
                      setInvoiceData({ ...invoiceData, rates: e.target.value })

                    }}
                    label="Tax Rates(%)"
                    placeholder="eg. 5, 10, 15"

                  />
                </Grid>
                <Grid item style={{ marginTop: '10px' }}  >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Due Date"
                      value={val}
                      onChange={(newValue) => {

                        setVal(newValue)
                        setDueDate(moment(newValue).format("MMM Do YYYY"))
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item >
                  {/* currencies */}
                  <Autocomplete
                    {...currenciesProps}
                    PaperComponent={CustomPaper}
                    renderInput={(params) => <TextField {...params} label="Select Currency" margin="normal" />}
                    // value={currency}
                    onChange={(event, value) => {
                      console.log(value)
                      setCurrency(value.symbol);
                    }}
                    style={{ minWidth: '200px' }}

                  />

                </Grid>




              </Grid>

            </section>

            <section className='note'>
              <Typography variant='overline' style={{ textAlign: 'left' }}>Notes/Terms</Typography>
              <textarea
                placeholder="Provide additional details or terms of service"
                onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                value={invoiceData.notes}
              />

            </section>


            <section className='saveButton'>
              <Grid container justifyContent="center">
                <Button
                  variant="contained"
                  style={{ justifyContentContent: 'center' }}
                  type="submit"
                  color="primary"
                  size="large"
                  className="button"
                  startIcon={<SaveIcon />}
                  disabled={isLoading}
                >
                  Save and Continue
                </Button>
                {
                  isLoading && <CircularProgress size={24} className="buttonProgress" color='success' />
                }
                
              </Grid>
            </section>








          </form>

        </div>

        <div className="footer">
          <FabFooter />
        </div>
      </div>

    </>
  )
}
