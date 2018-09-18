import { SET_PICTURES ,ADD_PICTURE,PICTURE_FETCHED } from "../constants";

// and change json to be data 
const pictures = (state = [] , action ={}) => {
    switch (action.type) {
        case SET_PICTURES:
            return action.pictures;
        case ADD_PICTURE:
            return [
                ...state , 
                action.picture
            ]
        // index => 索引位置
        case  PICTURE_FETCHED:
        const index = state.findIndex( item => item._id === action.picture._id)
        if (index > -1){
            state.map(item => {
                if( item._id === action.picture._id ) return action.picture;
                return item ;
            })
        }else{
            return [
                ...state , 
                action.picture
            ]
        }

        default:
            return state;
    }
};

export default pictures ;