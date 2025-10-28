import { API_ERROR, API_REQUEST, API_SUCCESS } from "./Constant";

const initialState = {
     loading: true,
     data: [],
     error: ""
}

const reducer = (state= initialState, action: any) => {
     switch(action.type){
         case API_REQUEST:
            return {...state, loading: true};
         case API_SUCCESS:
            return {...state, loading: false, data: action.payload};
        case API_ERROR:
          return {...state, loading: false, data: [], error: action.payload};
         default: 
             return {...state};
     }
}

export default reducer;1