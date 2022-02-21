

const clientReducer = (state ={ isLoading: true, clients : []}, action) =>{
    switch(action.type){
        case 'START_LOADING':
            return {...state, isLoading : true}
        case 'STOP_LOADING':
            return {...state, isLoading : false}
        
        case 'ADD_CLIENT' :
            return {...state, clients : [...state.clients, action.payload.data]}
        case 'GET_CLIENTS_BY_USER' :
            return {...state, clients : action.payload}

        case 'GET_CLIENT' : 
            return {...state, clients: action.payload.client}

        case 'UPDATE_CLIENT' :
            return {...state, clients : state.clients.map(client => client._id === action.payload._id ? action.payload : client)}
        case 'DELETE_CLIENT' :
            return {
                ...state,
                clients : state.clients.filter(client => client._id !== action.payload._id),
            }
        default: 
            return state;
    
    }
}

export default clientReducer;