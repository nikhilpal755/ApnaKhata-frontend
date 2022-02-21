import React,{useState} from 'react'

// import '../Invoice/invoiceDetails.css'
import moment from 'moment'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import  {Button, IconButton} from '@mui/material'

export default function PaymentHistory({ paymentRecords }) {

    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="payment-history">

                  <div className="stripe" style={{margin: '0px auto', height: '60px', backgroundColor: 'black', width: '70%', borderRadius : '5px', marginTop: '150px', color : 'white', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                      <Button variant='outline' style={{backgroundColor: '#8f53e5', height: '100%'}} >Payment History</Button>
                      <IconButton style={{height: '100%'}} onClick={() => setOpen(!open)}>
                         {<ArrowForwardIosIcon style={{color : 'white', height: '100%'}}/>}
                      </IconButton>

                  </div>

                  {
                      open && (
                          <>
                          <div>
                              <table style={{width: '70%', margin: '0 auto'}}>
                                  <tbody>
                                      <tr style={{backgroundColor: 'grey'}}>
                                          <th>Date Paid</th>
                                          <th>Amount Paid</th>
                                          <th>Payment Method</th>
                                          <th>Note</th>
                                      </tr>
                                      {paymentRecords?.map((record) => (
                                          <tr key={record._id}>
                                              <td>{moment(record.datePaid).format('MMMM Do YYYY')}</td>
                                              <td>{parseFloat(record.amountPaid).toFixed(2)}</td>
                                              <td>{record.paymentMode}</td>
                                              <td>{record.note}</td>
                                          </tr>
  
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                          </>
                      )

                      
                  }

       
            </div>

        </>
    )
}
