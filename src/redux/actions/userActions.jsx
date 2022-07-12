import { ActionTypes } from "../constants/actionTypes"

export const setUser = (user) =>{
    return {
        type : ActionTypes.SET_USER_DETAILS,
        payload : user
    }
}

export const getUser = (user) =>{
    return {
        type : ActionTypes.GET_USER_DETAILS ,
        payload : user
    }
}

export const addUser = (user) =>{
    return {
        type : ActionTypes.ADD_USER_DETAILS ,
        payload : user
    }
}

export const updateUser = (user) =>{
    return {
        type : ActionTypes.UPDATE_USER_DETAILS,
        payload : user
    }
}

export const userLogout = () =>{
    return {
        type : ActionTypes.USER_LOGOUT,
    }
}

export const userError= (error) =>{
    return {
        type : ActionTypes.SET_USER_ERROR,
        payload : error
    }
}

export const userErrorUnset=()=>{
    return {
        type : ActionTypes.UNSET_USER_ERROR,
    }
}