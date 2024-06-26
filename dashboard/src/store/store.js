import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlices";
import fortgotResetPasswordReducer from "./slice/fortgotResetPasswordSlice";
import messagesReducer from "./slice/messagesSlice";
import timelineReducer from "./slice/timelineSlice";
import skillReducer from "./slice/skillSlice";
import softwareApplicationReducer from "./slice/softwareApplicationSlice";
import projectReducer from "./slice/projectSlice";


export const store=configureStore({
    reducer:{
        user:userReducer,
        messages:messagesReducer,
        timeline:timelineReducer,
        skill:skillReducer,
        application:softwareApplicationReducer,
        project:projectReducer,
        forgotPassword:fortgotResetPasswordReducer
    }
})
