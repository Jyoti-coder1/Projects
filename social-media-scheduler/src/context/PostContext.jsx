import { createContext, useReducer } from "react";

export const PostContext = createContext();
const initialState = {
    posts: [],
    hashtags: {}
};

function reducer(state, action) {
    switch (action.type) {
        case "ADD_POST": {
            const hashtagsInPost = action.payload.text.match(/#[a-zA-z0-9_]+/g) || [];
            const updatedHashtags = { ...state.hashtags };
            hashtagsInPost.forEach(tag => {
                updatedHashtags[tag] = (updatedHashtags[tag] || 0) + 1;
            });
            return {
                ...state,
                posts: [...state.posts, { ...action.payload, likes: 0, shares: 0 }],
                hashtags: updatedHashtags
            };
        }
        case "LIKE_POST":
            return {
                ...state,
                posts: state.posts.map((post, i) =>
                    i === action.index ? { ...post, likes: post.likes + 1 } : post
                )
            };
        case "SHARE_POST":
            return {
                ...state,
                posts: state.posts.map((post, i) =>
                    i === action.index ? { ...post, shares: post.shares + 1 } : post
                )
            };
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