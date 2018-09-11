import { SET_PICTURES } from "../constants";

// and change json to be data 
const pictures = (state = [] , action ={}) => {
    switch (action.type) {
        case SET_PICTURES:
            return action.pictures;
        default:
            return state;
    }
};

export default pictures ;