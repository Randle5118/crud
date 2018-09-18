// combineReducers を使って全てのreducerを繋がる

import { combineReducers } from 'redux'

import  pictures from './picture'

export default combineReducers({
    pictures
})  ;