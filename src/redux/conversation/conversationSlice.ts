import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";

const initialState: InitialState = {
    messages: [],
    loading: false,
    error: "",
    currentConversation: {},
    friend: {},
    
}
const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        getCurrentConversation: (state, action) => {
            state.currentConversation = action.payload
        },
        getCurrentMessages: (state, action) => {
            state.messages = action.payload
        },
        getFriendData: (state, action) => {
            state.friend = action.payload
        },
        newMessage: (state, action) => {
            state.messages = [...state.messages, action.payload]
        },
        removeCurrentConversation: (state) => {
            state.currentConversation = {}
        },
        removeMessage: (state, action) => {
            state.messages = state.messages.filter(item => item._id !== action.payload)
        },   

    }
})

export default conversationSlice.reducer;
export const { getCurrentConversation, getCurrentMessages, getFriendData, newMessage, removeCurrentConversation, removeMessage} = conversationSlice.actions