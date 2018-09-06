// combineReducers を使って全てのreducerを繋がる

import { combineReducers } from 'redux'

import  pictures from './pictures'

export default combineReducers({
    pictures
})  ;