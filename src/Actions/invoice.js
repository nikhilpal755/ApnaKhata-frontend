// invoices actions

import * as API from '../ApiCalls/index.js'

export const getInvoicesByUser = (searchQuery) => async(dispatch) =>{
    try{
        dispatch({type : 'START_LOADING'});
        // console.log(searchQuery);
        const {data} = await API.getRecordsByUser(searchQuery);
        // console.log(data);
        dispatch({type : 'GET_INVOICES_BY_USER', payload : data});
        dispatch({type : 'STOP_LOADING'});
    }catch(err){
        console.log(err);
    }
}


export  const getInvoice = (invoiceId) => async(dispatch) =>{
    try{
        dispatch({type : 'START_LOADING'});
        const {data} = await API.getRecordById(invoiceId);
        dispatch({type : 'GET_INVOICE_BY_ID', payload : data});
        dispatch({type : 'STOP_LOADING'});
    
    }catch(err){
        console.log(err);
    }
}

export const createInvoice = (invoiceData) => async (dispatch) => {
    try {

        dispatch({type : 'START_LOADING'});
        const { data } = await API.addRecord(invoiceData);
        // console.log(data)
        dispatch({ type: 'ADD_INVOICE', payload: data });
        // dispatch({type : 'STOP_LOADING'});
        console.log(data);


    } catch (err) {
        console.log(err);
    }
}

export const updateInvoice = (id, invoiceData) => async (dispatch) => {
    try {
        dispatch({type : 'START_LOADING'});
        const { data } = await API.updateRecord(id, invoiceData);
        dispatch({ type: 'UPDATE_INVOICE', payload: data });
    } catch (err) {
        console.log(err);
    }
}


export const deleteInvoice = (id, setOpenSnackBar) => async (dispatch) => {
    try{
        dispatch({type : 'START_LOADING'});
        const {data} = await API.deleteRecord(id);
        // console.log(data)
        dispatch({type : 'DELETE_INVOICE', payload : data});
        dispatch({type : 'STOP_LOADING'});

        setOpenSnackBar(true);
    }catch(err){
        console.log(err);
    }
}