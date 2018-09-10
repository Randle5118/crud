// fetchPicturesが使われたときはdispatch を実行して
// fetchの中の物を取りに行く

export const fetchPictures = () => {
    // dispatch = 發送
    // fetch = 取り出し =>ブラウザにある函数で、same like Jquery's post or get .
    return dispatch => {
        fetch('/api/pictures')
    }
    
}