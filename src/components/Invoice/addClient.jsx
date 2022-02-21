import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField , Snackbar, Alert } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { updateClient } from '../../Actions/client';


// import Snackbar from '@mui/material/Snackbar';
// import { Alert } from '@mui/material';

import { useDispatch } from 'react-redux';
import { createClient } from '../../Actions/client';


export default function AddClient({ open, setOpen , client }) {

  // here , client is not for adding the client but for updating the client

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const intital_state = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    userId: [],// kis user ka client hai
  }



  const [clientData, setClientData] = React.useState(intital_state);
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const location = useLocation();


  React.useEffect(() => {
    // fetching userId
    const userId = user?.result?._id;
    if (userId !== undefined) {// custom login user
      setClientData({ ...clientData, userId: [userId] });

    } else {// google login user
      setClientData({ ...clientData, userId: [user?.result?.googleId] });

    }

  }, [location])

  React.useEffect(() => {
    if (client !== undefined) {
      setClientData(client);
    }

  },[client])



  const clearState = () => {
    setClientData(intital_state);
  }

  const handleClose = () => {

    setOpenSnackBar(false);
  }



  // dispatch the action to add the client
  const handleSubmitClient = async (e) => {
    e.preventDefault();
    // console.log(clientData);
    if(client !== undefined){
      dispatch(updateClient(client._id, clientData, setOpenSnackBar));
    }else{
      dispatch(createClient(clientData, setOpenSnackBar));  
    }



    clearState();
    setOpen(false);
    window.location.reload();



  }

  return (
    <>

      <div>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle style={{ backgroundColor: '#905AD3', color: 'whitesmoke' }}>{client === undefined ? "New Customer": "Edit Customer details"}</DialogTitle>
          <DialogContent dividers>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
              value={clientData?.name}
            />
            <TextField

              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
              value={clientData?.email}
            />
            <TextField

              margin="dense"
              id="phoneNumber"
              label="phoneNumber"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setClientData({ ...clientData, phoneNumber: e.target.value })}
              value={clientData?.phoneNumber}
            />
            <TextField

              margin="dense"
              id="Address"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
              value={clientData?.address}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={handleSubmitClient} variant="contained" style={{ backgroundColor: '#905AD3' }}>{ client === undefined ? "Save Customer" : "Edit Customer"}</Button>

          </DialogActions>
        </Dialog>
      </div>

      {
        openSnackBar && (
          <>
            <Snackbar open={openSnackBar} autoHideDuration={5000} onClose={handleClose}>
              <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
               {client === undefined ? "Client added successfully" : "Client updated successfully"} 
              </Alert>
            </Snackbar>
          </>
        )
      }



    </>
  );
}
