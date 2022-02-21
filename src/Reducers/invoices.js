// invoices reducer

const InvoicesReducer = (state={invoices : [] , isLoading : false}, action) =>{
    switch(action.type){
        case 'START_LOADING':
            return {...state, isLoading : true}
        case 'STOP_LOADING':
            return {...state, isLoading : false}
        case 'GET_ALL' : // for '/invoices'
            return {
                ...state,
                invoices : action.payload.data,
                currentPage : action.payload.currentPage,
                numberOfPages : action.payload.numberOfPages,
            }
        case 'GET_INVOICES_BY_USER' :
            return {    
                ...state,
                invoices : action.payload,
            }
        case 'GET_INVOICE_BY_ID' :
            return {
                ...state,
                invoice : action.payload,
            }
        case 'ADD_INVOICE' :
            return {
                ...state,
                invoices : [...state.invoices,  action.payload],
            }
        case 'UPDATE_INVOICE' :
            return {
                ...state,
                invoices : state.invoices.map((invoice) => invoice._id === action.payload._id ? action.payload : invoice),
            }

        case 'DELETE_INVOICE' :
            return {
                ...state,
                invoices : state.invoices.filter((invoice) => invoice._id !== action.payload._id),
            }
        default:
            return state;
    }

}
export default InvoicesReducer;