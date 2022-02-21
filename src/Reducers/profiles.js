

const ProfileReducer = (state={isLoading: true, profiles : []}, action) =>{

    switch(action.type){
        case 'CREATE_PROFILE':
            return {
                ...state,
                profiles : [...state.profiles, action.payload],
            }
         case 'GET_PROFILE':
             return {
                    ...state,
                    profiles : action.payload,
             }
          case 'UPDATE_PROFILE':
              return {
                  ...state, 
                  profiles: state.profiles.map(profile => (profile._id === action.payload._id ? action.payload : profile)) 
              }
        default : 
            return state;
    }

}

export default ProfileReducer;