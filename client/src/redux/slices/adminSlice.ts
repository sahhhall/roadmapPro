import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuth: false
}


const adminReducer = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        adminAuth(state) {
            state.isAuth = true
        },
        adminLogout(state) {
            state.isAuth = false
        }
    }
})

export const { adminAuth, adminLogout } = adminReducer.actions

export default adminReducer.reducer