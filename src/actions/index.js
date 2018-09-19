// import the constants
import { SET_PICTURES , ADD_PICTURE, PICTURE_FETCHED , PICTURE_UPDATED, DELETE_PICTURE} from "../constants";



// fetchPicturesが使われたときはdispatch を実行して
// fetchの中の物を取りに行く

// add to constants(常量,常數)
// pictures is from fetchPictures.data.pictures
export const setPictures = (pictures) => ({
    type: SET_PICTURES,
    pictures
})

export const pictureFetched = (picture) => ({
    type: PICTURE_FETCHED,
    picture
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

export const fetchPicture = (id) => {
    return dispatch => {
        fetch(`/api/pictures/${id}`)
        .then(res => res.json())
        .then(data => dispatch(pictureFetched(data.picture)))
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
            // post => add new data
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

export const pictureUpdated = (picrure) => ({
    type: PICTURE_UPDATED,
    picrure
})

export const updatePicture = (data) => {
    return dispatch =>{
        return fetch(`/api/pictures/${data._id}`, { 
            // change a data
            method : 'put',
            body : JSON.stringify(data),
            headers :{
                "Content-Type" : "application/json"
            }
        }).then(handleResponse)
          .then( data => dispatch(pictureUpdated(data.picture)))
    }
}

export const pictureDelete = (pictureId) => ({
    type: DELETE_PICTURE,
    pictureId
})

// copy form updatePicture
// when you wanna delete a data you only need ID
export const deletePicture = (id) => {
    return dispatch =>{
        return fetch(`/api/pictures/${id}`, { 
            method : 'delete',
            headers :{
                "Content-Type" : "application/json"
            }
        }).then(handleResponse)
          .then( data => dispatch(pictureDelete(id)))
    }
}