import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "./types";

const initialState: SearchState = {
    searchInfo: [],
    error: "",
    loading: false,
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        fetch: (state) => {
            state.loading = true;
        },
        successFetch: (state, action) => {
            state.loading = false,
                state.error = "",
                state.searchInfo = action.payload
        },
        failToFetch: (state, action) => {
            state.loading = false,
                state.error = action.payload
            state.searchInfo = []
        }
    }
})

export default searchSlice.reducer;
export const { fetch, successFetch, failToFetch } = searchSlice.actions