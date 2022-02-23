import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/navbar';
import SideBar from '../../components/Sidebar/Sidebar';


import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { getInvoicesByUser } from '../../Actions/invoice.js';


import { Grid } from '@mui/material'
import CustomCard from '../../components/DashboardComponents/card';
import FabFooter from '../../components/Footer/fab';
import { CircularProgress } from '@mui/material'


import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PaidIcon from '@mui/icons-material/Paid';
import PaymentIcon from '@mui/icons-material/Payment';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import BarGraph from '../../components/DashboardComponents/barGraph';
import moment from 'moment'
import { Table , TableBody, TableCell, TableRow } from '@mui/material';
import './dashboard.css'


export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem('profile'));
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { invoices, isLoading } = useSelector(state => state?.InvoicesReducer);

  // console.log(invoices.length)

  // overDue invoices
  const overDueInvoices = invoices?.filter(invoice => invoice.dueDate < new Date().toISOString());

  // invoices on the basis of status
  const paidInvoices = invoices?.filter(invoice => invoice.status === 'Paid');
  const unpaidInvoices = invoices?.filter(invoice => invoice.status === 'Unpaid');
  const partialPaidInvoices = invoices?.filter(invoice => invoice.status === 'Partial');

  // payment history
  let paymentHistory = []
  for (let i = 0; i < invoices?.length; i++) {
    let history = []
    if (invoices[i].paymentRecords !== undefined) {
      history = [...paymentHistory, invoices[i].paymentRecords]
      paymentHistory = [].concat.apply([], history);
    }
  }

  // sort payment history by date
  const sortPaymentHistory = paymentHistory?.sort((a, b) => {
    return new Date(b.datePaid).getTime() - new Date(a.datePaid).getTime()
  });

  // Total amount paid
  let totalAmountPaid = 0;
  for (let i = 0; i < invoices?.length; i++) {

    if (invoices[i].totalAmountReceived !== undefined) {
      totalAmountPaid += invoices[i].totalAmountReceived;
    }
  }

  // Total amount
  let totalAmount = 0;
  for (let i = 0; i < invoices?.length; i++) {
    totalAmount += invoices[i].total;
  }



  useEffect(() => {
    dispatch(getInvoicesByUser(user?.result?._id || user?.result?.googleId || user?.existedUser?._id));
  }, [location])




  useEffect(() => {
    // console.log(location.pathname)
    if (user && (location.pathname === '' || location.pathname === '/login')) {
      navigate('/dashboard');
    }

  }, [location, user])
  
  // payement history - using reactApexCharts, 







  return (
    <>
      <div className='dashBoard' style={{ width: '100vw', height: '100vh', maxWidth: '100%', backgroundColor: '#B3ACE5', overflowY: 'auto' }}>

      

        <div className="sidebar" style={{ position: 'fixed' }}>
          <SideBar />
        </div>
        <div className="navbar" >
          <Navbar />
        </div>
        <div className="content" style={{ marginLeft: '100px', paddingTop: '2%' }} >

          
    
          {
            isLoading && <div className="loader" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress color='secondary' size={200} className="buttonProgress" />
            </div>
          }
          {invoices.length === 0 && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>Nothing to display. Click the plus icon to start creating</div>
          </div>}
          {
            invoices.length !== 0 && !isLoading && <div className="dashboardContent" style={{ height: '100%', width: '100%' }}>

              <Grid xs='12' container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <CustomCard desc="Payment Recieved" val={parseFloat(totalAmountPaid).toFixed(2)} icon={<LibraryAddCheckIcon sx={{ color: 'green' }} />} />
                <CustomCard desc="Pending Amount" val={parseFloat(totalAmount - totalAmountPaid).toFixed(2)} icon={<PendingActionsIcon sx={{ color: 'orange' }} />} />
                <CustomCard desc="Total Amount" val={parseFloat(totalAmount).toFixed(2)} icon={<PaidIcon sx={{ color: 'blue' }} />} />
                <CustomCard desc="Total Invoices" val={invoices.length} icon={<PaymentIcon sx={{ color: 'green' }} />} />
                <CustomCard desc="Paid Invoices" val={paidInvoices.length} icon={<LibraryAddCheckIcon sx={{ color: 'green' }} />} />
                <CustomCard desc="Partial Paid Invoices" val={partialPaidInvoices.length} icon={<AccessTimeIcon sx={{ color: 'orange' }} />} />
                <CustomCard desc="Unpaid Invoices" val={unpaidInvoices.length} icon={<SentimentVeryDissatisfiedIcon sx={{ color: 'red' }} />} />
                <CustomCard desc="OverDue Invoices" val={overDueInvoices.length} icon={<AccessAlarmsIcon sx={{ color: 'red' }} />} />

              </Grid>

              <section className="barGraph">
                <BarGraph paymentHistory={sortPaymentHistory} />


              </section>

              <section className='recentPayments' style={{margin: '40px auto'}}>
                <h1 style={{ textAlign: 'center', padding: '30px' }}>{paymentHistory.length ? 'Recent Payments' : 'No payment received yet'}</h1>
                <div>
                  <div className={"table"} >

                    <Table>
                      <TableBody>
                        {paymentHistory.length !== 0 && (
                          <TableRow>
                            <TableCell style={{ padding: '15px' }}></TableCell>
                            <TableCell style={{ padding: '15px' }}>Paid By</TableCell>
                            <TableCell style={{ padding: '15px' }}>Date Paid</TableCell>
                            <TableCell style={{ padding: '15px' }}>Amount Paid</TableCell>
                            <TableCell style={{ padding: '15px' }}>Payment Method</TableCell>
                            <TableCell style={{ padding: '15px' }}>Note</TableCell>
                          </TableRow>
                        )}

                        {sortPaymentHistory.slice(-10).map((record) => (
                          <TableRow className={"tableRow"} key={record._id}>
                            <TableCell><button>{record?.paidBy?.charAt(0)}</button></TableCell>
                            <TableCell>{record.paidBy}</TableCell>
                            <TableCell>{moment(record.datePaid).format('MMMM Do YYYY')}</TableCell>
                            <TableCell><h3 style={{ color: '#00A86B', fontSize: '14px' }} > {parseFloat( record.amountPaid).toFixed(2)}</h3></TableCell>
                            <TableCell>{record.paymentMode}</TableCell>
                            <TableCell>{record.note}</TableCell>
                          </TableRow>

                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

              </section>


            </div>
          }

          <section className="fabIcon" style={{ position: 'fixed', top: '85vh', left: '90vw' }}>
            <FabFooter />

          </section>


        </div>
      </div>


    </>

  )
}
