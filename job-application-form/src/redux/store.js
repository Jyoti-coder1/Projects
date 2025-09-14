import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./applicationSlice";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("applications");
        if (serializedState === null) return undefined;
        return { applications: JSON.parse(serializedState) };
    }
    catch (e) {
        return undefined;
    }
};

const saveData = (state) => {
    try {
        const serializedState = JSON.stringify(state.applications);
        localStorage.setItem("applications", serializedState);
    }
    catch (e) {
        console.error("Could not save state", e);
    }
};

const store = configureStore({
    reducer: {
        applications: applicationReducer,
    },
    preloadedState: loadState(),
});

store.subscribe(() => {
    saveData(store.getState());
});

export default store;