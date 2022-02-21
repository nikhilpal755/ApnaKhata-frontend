import Home from "./pages/Home/home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./pages/Auth/login";
import Dashboard from "./pages/Dashboard/dashboard";
import Invoice from "./components/Invoice/invoice";
import InvoiceDetails from "./components/Invoice/invoiceDetails";
import Invoices from './pages/Invoices/invoices';
import Clients from './pages/Clients/clients';
import Profile from "./components/Settings/buisnessProfile";
import ForgotPassword from './components/Password/forgotPassword';


function App() {

  return (
    <div className="App">
      <Router>
      
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='dashboard' element={<Dashboard />}></Route>
          <Route path='invoice' element={<Invoice />}></Route>
          <Route path='invoice/:id' element={<InvoiceDetails />}></Route>
          <Route path='edit/invoice/:id' element={<Invoice/>}></Route>
          <Route path='invoices' element={<Invoices/>}></Route>
          <Route path='customers' element={<Clients/>}></Route>
          <Route path='settings' element={<Profile/>}></Route>
          <Route path='forgot' element={<ForgotPassword/>}></Route>

        </Routes>
      </Router>

    </div>
  );
}

export default App;
