import { SET_PICTURES ,ADD_PICTURE } from "../constants";

// and change json to be data 
const pictures = (state = [] , action ={}) => {
    switch (action.type) {
        case SET_PICTURES:
            return action.pictures;
        case ADD_PICTURE:
            return [
                ...state , 
                action.picture]
        default:
            return state;
    }
};

export default pictures ;