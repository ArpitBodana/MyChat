import { createSlice } from "@reduxjs/toolkit";
import { allConvoType } from "./types";

const initialState: allConvoType = {
    conversation: [],
    friends: [],
}

const allChatSlice = createSlice({
    name: "allChat",
    initialState,
    reducers: {
        getLastMsg: (state, action) => {
            const present = state.conversation.find(item => item._id === action.payload._id)
            if (present) {
                present.lastMessage = action.payload.lastMessage
                present.time = action.payload.time
                present.newMessage = action.payload.newMessage
            }
            else {
                state.conversation = [...state.conversation, action.payload]
            }
        },
        removeLastMsg: (state, action) => {
            const present = state.conversation.find(item => item._id === action.payload._id)
            if (present) {
                present.lastMessage = ""
                present.time = ""
            }
        },
        getFriend: (state, action) => {
            const present = state.friends.find(item => item._id === action.payload._id)
            if (!present) {
                state.friends = [...state.friends, action.payload]
            }

        },
        removeFriend: (state, action) => {
            state.friends = state.friends.filter(item => item._id !== action.payload)
        },
    }
})

export default allChatSlice.reducer;
export const { getLastMsg, removeLastMsg, getFriend, removeFriend } = allChatSlice.actions;
