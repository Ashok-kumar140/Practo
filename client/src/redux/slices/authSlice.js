import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    loading: false,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setToken(state, value) {
            state.token = value.payload;
        },
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    },

});

export const { setToken, setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;