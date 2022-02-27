import axios from 'axios';


const API = axios.create({baseURL : 'https://apnakhata01.herokuapp.com'});

// interceptors to check if user is logged in or not
API.interceptors.request.use((req) =>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});


// auth api request
export const signUp = (formdata) => API.post('/users/signup', formdata);
export const signIn = (formdata) => API.post('/users/signin', formdata);
export const forgot = (formdata) => API.post('/users/forgot', formdata);
export const reset = (form, token) => API.post(`users/reset/${token}`, form);



// Client api requests
export const addClient = (client) => API.post('/clients',client);
export const getClient = (id) => API.get(`/clients/${id}`);
export const getClientsByUser =(searchQuery) => API.get(`/clients?searchQuery=${searchQuery}`);
export const updateClient = (id, updatedClient) => API.patch(`/clients/${id}`, updatedClient);
export const deleteClient = (id) => API.delete(`/clients/${id}`);


// profile api requests
export const getAllProfiles = () => API.get('/profiles');
export const getProileById = (id) => API.get(`/profiles/${id}`);
export const getProfileByUser = (searchQuery) => API.get(`/profiles?searchQuery=${searchQuery}`);
export const createProfile = (profile) => API.post('/profiles', profile);
export const updateProfile = (id, updatedProfile) => API.patch(`/profiles/${id}`, updatedProfile);
export const deleteProfile = (id) => API.delete(`/profiles/${id}`);





// invoice/record api request
export const getRecordById = (id) => API.get(`/records/${id}`);
export const getRecordsByUser = (searchQuery) => API.get(`/records?searchQuery=${searchQuery}`);
export const addRecord = (record) => API.post('/records', record);
export const updateRecord = (id, updatedRecord) => API.patch(`/records/${id}`, updatedRecord);
export const deleteRecord = (id) => API.delete(`/records/${id}`);







export default API;
