import { createContext, useReducer } from "react";

const PostContext = createContext();
const initialState = {
    posts: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "ADD_POST":
            return { ...state, posts: [...state.posts, action.payload] };
        default:
            return state;
    }
}

export function PostProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <PostContext.Provider value={{ state, dispatch }}>
            {children}
        </PostContext.Provider>
    );
}

export default PostContext;