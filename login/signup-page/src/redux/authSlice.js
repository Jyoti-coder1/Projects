import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signup: (state, action) => {
            state.user = action.payload; // save user info
            state.isAuthenticated = false; // signup doesn’t auto-login
        },
        login: (state, action) => {
            const { email, password } = action.payload;
            if (
                state.user &&
                state.user.email === email &&
                state.user.password === password
            ) {
                state.isAuthenticated = true;
            } else {
                alert("Invalid credentials!");
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;