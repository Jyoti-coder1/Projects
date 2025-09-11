import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("authSate");
        if(!serializedState) return undefined;
        return {
            auth: JSON.parse(serializedState)
        };
    }
    catch (e) {
        return undefined;
    }
}

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state.auth);
        localStorage.setItem("authState", serializedState);
    }
    catch (e) {
        console.log("Could not save state", e);
    }
};

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState: loadState(),
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;