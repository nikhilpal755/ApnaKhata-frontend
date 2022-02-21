import React, { useState, useEffect } from 'react'

import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Autocomplete } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { useDispatch } from 'react-redux';
import { updateInvoice } from '../../Actions/invoice';

export default function Modal({ open, setOpen, invoice }) {



    const [datePaid, setDatePaid] = useState(new Date());
    const [payment, setPayment] = useState({
        amountPaid: 0,
        datePaid: new Date(),
        paymentMode: '',
        note: '',
        paidBy: '',
    })

    const [paymentRecords, setPaymentRecords] = useState([]);
    const[totalAmountReceivedBefore, setTotalAmountReceivedBefore] = useState(0);
    const [updatedInvoice, setUpdatedInvoice] = useState(invoice);
    const dispatch = useDispatch();

    // useEffects to handle
    useEffect(() => {
        if (invoice?.paymentRecords) {
            setPaymentRecords(invoice.paymentRecords);

        }
        if (invoice) {
            setPayment({ ...payment, amountPaid: Number(invoice?.total) - Number(invoice?.totalAmountReceived), paidBy: invoice?.client?.name })
        }
    }, [invoice])

    useEffect(() => {
        let totalReceived = 0
        for (var i = 0; i < invoice?.paymentRecords?.length; i++) {
            totalReceived += Number(invoice?.paymentRecords[i]?.amountPaid)
            setTotalAmountReceivedBefore(totalReceived)
        }
    }, [invoice, payment])



    useEffect(() => {
        setUpdatedInvoice({
            ...invoice, status: (Number(totalAmountReceivedBefore) + Number(payment.amountPaid))
                >=
                invoice?.total ? 'Paid' : 'Partial',
            paymentRecords: [...paymentRecords, payment],
            totalAmountReceived: Number(totalAmountReceivedBefore) + Number(payment.amountPaid)
        })
    }, [payment, paymentRecords, totalAmountReceivedBefore, invoice])




    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updatedInvoice)
        dispatch(updateInvoice(invoice._id,updatedInvoice))
        .then(() =>{
            setOpen(false);
            window.location.reload();
        })
    

    }
    return (
        <>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle style={{ backgroundColor: '#905AD3', color: 'whitesmoke' }}>Record Payment</DialogTitle>
                <DialogContent dividers>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date Paid"
                            value={datePaid}
                            onChange={(newValue) => {
                                setDatePaid(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        type="number"
                        name="amountPaid"
                        margin="dense"
                        label="Amount Paid"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setPayment({ ...payment, amountPaid: e.target.value })}
                        value={payment.amountPaid}

                    />

                    <Autocomplete
                        options={['Cash', 'Cheque', 'Credit Card', 'Debit Card', 'Paypal']}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} label="Payment Mode" />}
                        onChange={(event, value) => { 
                            setPayment({ ...payment, paymentMode: value })
                            //  console.log(value)
                    }}

                    />

                    <TextField

                        margin="dense"

                        label="Note"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setPayment({ ...payment, note: e.target.value })}
                        value={payment.note}
                    />

                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained" onClick={handleSubmit} style={{ backgroundColor: '#905AD3' }}>Add Payment</Button>

                </DialogActions>
            </Dialog>
        </>
    )
}
