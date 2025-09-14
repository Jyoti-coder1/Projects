import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        list: [],
    },
    reducers: {
        addApplication: (state, action) => {
            state.list.push(action.payload);
        },
    },
});

export const { addApplication } = applicationSlice.actions;
export default applicationSlice.reducer;