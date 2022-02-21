import * as api from '../ApiCalls/index.js';


export const createClient = (clientData, setOpenSnackBar) => async (dispatch) => {

    try {

        const { data } = await api.addClient(clientData);
        dispatch({ type: 'ADD_CLIENT', payload: data });

        setOpenSnackBar(true);
    
    } catch (err) {
        console.log(err);
    }
}


export const getClientsOfUser =(userId) => async (dispatch) => {
    try{
        // dispatch({ type: 'START_LOADING' });
     
        const {data} = await api.getClientsByUser(userId);
        dispatch({type : 'GET_CLIENTS_BY_USER', payload : data});
        // dispatch({ type: 'STOP_LOADING' });
    
    }catch(err){
        console.log(err);
    }
}

export const updateClient = (id, clientData, setOpenSnackBar) => async(dispatch) =>{
    try{
        dispatch({type : 'START_LOADING'});
        const {data} = await api.updateClient(id, clientData);
        dispatch({type : 'UPDATE_CLIENT', payload : data});
        dispatch({type : 'STOP_LOADING'});

        setOpenSnackBar(true);
    }catch(err){
        console.log(err);
    }
}

export  const deleteClient = (id) => async(dispatch) =>{
    try{
        dispatch({type : 'START_LOADING'});
        const {data} = await api.deleteClient(id);
        dispatch({type : 'DELETE_CLIENT', payload : data});
        dispatch({type : 'STOP_LOADING'});

    
    }catch(err){
        console.log(err);
    }
}