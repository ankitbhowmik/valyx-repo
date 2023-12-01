import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "Ankit Bhowmik",
    userEmail: "ankibhowmik@gmail.com",
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload.loading
        }
    }
})

export const userAction = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;