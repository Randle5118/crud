// import the constants
import { SET_PICTURES } from "../constants";

// fetchPicturesが使われたときはdispatch を実行して
// fetchの中の物を取りに行く

// add to constants(常量,常數)
// pictures is from fetchPictures.data.pictures
export const setPictures = (pictures) => ({
    type: SET_PICTURES,
    pictures
})



export const fetchPictures = () => {
    // dispatch = 發送
    // fetch = 取り出し =>ブラウザにある函数で、same like Jquery's post or get .
    return dispatch => {
        fetch('/api/pictures')
        // change the response and change to json 
        .then(res => res.json())
        // and change json to be data 
        .then(data => dispatch(setPictures(data.pictures)))
    }
    
}