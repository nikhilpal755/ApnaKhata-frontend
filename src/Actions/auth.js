import * as api from '../ApiCalls/index.js';

export const SignUp = async(formdata, dispatch) =>{
    try{
        // storing user into database
         const {data} =  await api.signUp(formdata);
        //  console.log(data);
         // storing user into local storage
         dispatch({type : 'AUTH', data :data});

         try{

             const {newProfile} = await api.createProfile({
                name : data?.result?.name,
                email : data?.result?.email,
                userId : data?.result?._id,
                phoneNumber: '',
               buisnessName: '', 
               buisnessAddress: '',
               logo: '',    
               website: ''
    
              }
              );
            //   console.log(newProfile);
              dispatch({type : 'CREATE_PROFILE', payload : newProfile});
         }catch(err){
             console.log(err);
         }


        //  openSnackBar('Sign Up Successful');

         window.location.href= '/dashboard';


         

    }catch(err){

        console.log(err);
    }

}

export const SignIn = async(formdata ,dispatch ) =>{
    try{

        const {data} = await api.signIn(formdata);
        console.log(data);
        dispatch({type : 'AUTH', data :data});
        window.location.href= '/dashboard';


    }catch(err){
        console.log(err);

    }
}

export const forgotPassword = (formdata) => async(dispatch) =>{
    try{
        await api.forgot(formdata);;
    }catch(err){
        console.log(err);
    }
}

export const resetPassword = (token, form, navigate) => async(dispatch) =>{
    try{
        await api.reset(form, token);
        navigate('/login');

    }catch(err){
        console.log(err);
    }
}