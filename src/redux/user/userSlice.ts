import { createSlice, } from "@reduxjs/toolkit"
import { InitialState, } from "./types"


const data = localStorage.getItem('user');
const infoData = localStorage.getItem('userInfo');
const initialState: InitialState = {
    loading: false,
    error: "",
    user: data ? JSON.parse(data) : {},
    info: infoData ? JSON.parse(infoData) : {},
    onlineUsers: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userRequest: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.loading = false,
                state.error = "",
                state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        signInFail: (state, action) => {
            state.loading = false,
                state.user = {},
                state.error = action.payload
        },
        logout: (state) => {
            state.loading = false,
                state.user = {},
                state.error = "",
                state.info = {},
                //localStorage.clear();
                localStorage.removeItem('user');
            localStorage.removeItem('currentChatId');
            localStorage.removeItem('userInfo');
        },
        getUserInfo: (state, action) => {
            state.info = action.payload,
                localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        removeUserRequest: (state, action) => {
            state.info.requests = state.info.requests?.filter(item => item !== action.payload)
        },
        getOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        }
    },
}
)

export default userSlice.reducer;
export const { userRequest, signInFail, signInSuccess, logout, getUserInfo, removeUserRequest, getOnlineUsers } = userSlice.actions