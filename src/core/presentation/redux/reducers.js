import { NEW_LOCATION } from "./actions";
const initialState = {
    locations: []
}



function locationReducer(state = initialState, action){
    switch(action.type){
        case NEW_LOCATION:
            const arrayExistCoordinates = state.locations.filter(
                location => location.title !== action.payload.title
            )
    
            return {
                ...state,
                locations: [...arrayExistCoordinates, action.payload]
            }
            
        default: 
            return state;
    }
}

export default locationReducer