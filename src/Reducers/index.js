// combining all reducers

import { combineReducers } from 'redux';

import AuthReducer from './auth.js';
import ProfileReducer from './profiles.js';
import InvoicesReducer from './invoices.js'
import ClientReducer from './client.js'

export default combineReducers({AuthReducer, ProfileReducer, InvoicesReducer, ClientReducer});  