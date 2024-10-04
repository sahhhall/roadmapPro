import { IUser } from "@/types/database";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    userData: null | IUser
}

const initialState: InitialState = {
    userData: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, { payload }: PayloadAction<IUser>) {
            state.userData = payload
        },
        logout(state) {
            state.userData = null
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;