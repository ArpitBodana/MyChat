import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user/userSlice"
import thunk from "redux-thunk";
import conversationReducer from "./conversation/conversationSlice"
import searchReducer from "./search/searchSlice"
import allChatReducer from "./allChat/allChatSlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        conversation: conversationReducer,
        search: searchReducer,
        allChat: allChatReducer
    },
    middleware: []
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch