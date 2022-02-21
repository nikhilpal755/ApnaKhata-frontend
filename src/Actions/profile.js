// all profile related actions

import * as api from '../ApiCalls/index.js';

export const createProfile = (newProfile) => async(dispatch) =>{
    try{

       const {data} =  await api.createProfile(newProfile);
    //    console.log(newProfile)
       dispatch({type : 'CREATE_PROFILE', payload :data});
       

    }catch(err){
        console.log(err);
    }
    
}

export const getProfile = (userId) => async(dispatch) =>{
    try{
        const {data} = await api.getProfileByUser(userId);
        // console.log(data)
        dispatch({type : 'GET_PROFILE', payload :data});
    }catch(err){
        console.log(err);
    }
}


export const updateProfile = (id, updatedProfile) => async(dispatch) =>{
    try{
        dispatch({type : 'START_LOADING'});
        const {data} = await api.updateProfile(id, updatedProfile);
        dispatch({type: 'UPDATE_PROFILE', payload: data});
        dispatch({type: 'STOP_LOADING'});
    }catch(err){

        console.log(err);
    }
}