
import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import doctorReducer from '../slices/doctorSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    doctor:doctorReducer,

})

export default rootReducer;