// import the constants
import { SET_PICTURES , ADD_PICTURE } from "../constants";


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

const handleResponse = (response) => {
    // when website responese 200 send the response.json , and i response error ,throw the error    
    if(response.ok){
        return response.json()
    }else{
        let error = new Error(response.statusText)
        console.log('statusText' , response.statusText)
        error.response = response
        console.dir(error)
        throw error 
    }
}

export const addPicture = (picture) => ({
    type: ADD_PICTURE,
    picture
})

export const savePicture = (data) => {
    return dispatch =>{
        return fetch('/api/pictures', { 
            method : 'post',
            // stringify => 字符串 （str)
            // JSON.stringify() >> let data chage to stringify
            body : JSON.stringify(data),
            // format => 格式
            // headers mean about the format when we upload 
            headers :{
                "Content-Type" : "application/json"
            }
        }).then(handleResponse)
          .then( data => dispatch(addPicture(data.picture)))
    }
}

