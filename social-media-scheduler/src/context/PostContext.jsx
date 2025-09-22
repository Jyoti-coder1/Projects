import { createContext, useReducer } from "react";

export const PostContext = createContext();

const initialState = {
    posts: JSON.parse(localStorage.getItem("posts")) || [],
    hashtags: JSON.parse(localStorage.getItem("hashtags")) || {},
    alerts: JSON.parse(localStorage.getItem("alerts")) || []
};

function detectCategory(text) {
    const lower = text.toLowerCase();
    if (lower.includes("sale") || lower.includes("launch") || lower.includes("offer")) return "Promo";
    if (lower.includes("learn") || lower.includes("guide") || lower.includes("tips")) return "Educational";
    return "Entertainment";
}

// Save state to localStorage
function saveToLocalStorage(state) {
    localStorage.setItem("posts", JSON.stringify(state.posts));
    localStorage.setItem("hashtags", JSON.stringify(state.hashtags));
    localStorage.setItem("alerts", JSON.stringify(state.alerts));
}

// Add an alert to state
function addAlert(state, message) {
    const newAlerts = [...state.alerts, { message, id: Date.now() }];
    const newState = { ...state, alerts: newAlerts };
    saveToLocalStorage(newState);
    return newState;
}

function reducer(state, action) {
    let newState;

    switch (action.type) {
        case "ADD_POST": {
            const hashtagsInPost = action.payload.text.match(/#[a-zA-Z0-9_]+/g) || [];
            const updatedHashtags = { ...state.hashtags };
            hashtagsInPost.forEach(tag => {
                updatedHashtags[tag] = (updatedHashtags[tag] || 0) + 1;
            });
            const category = detectCategory(action.payload.text);

            newState = {
                ...state,
                posts: [...state.posts, { ...action.payload, likes: 0, shares: 0, category, reshareOf: null, status: "Draft" }],
                hashtags: updatedHashtags
            };

            // Add alert
            newState = addAlert(newState, "New post added!");
            return newState;
        }

        case "BULK_UPLOAD": {
            const updatedHashtags = { ...state.hashtags };
            const newPosts = action.payload.map(post => {
                const hashtagsInPost = post.text.match(/#[a-zA-Z0-9_]+/g) || [];
                hashtagsInPost.forEach(tag => {
                    updatedHashtags[tag] = (updatedHashtags[tag] || 0) + 1;
                });
                return {
                    ...post,
                    likes: 0,
                    shares: 0,
                    category: detectCategory(post.text),
                    reshareOf: null,
                    status: "Draft"
                };
            });

            newState = {
                ...state,
                posts: [...state.posts, ...newPosts],
                hashtags: updatedHashtags
            };

            newState = addAlert(newState, "Bulk upload successful!");
            return newState;
        }

        case "LIKE_POST": {
            const updatedPosts = state.posts.map((post, i) =>
                i === action.index ? { ...post, likes: post.likes + 1 } : post
            );
            const likedPost = updatedPosts[action.index];

            newState = { ...state, posts: updatedPosts };

            if (likedPost.likes === 5 && !likedPost.reshareOf) {
                updatedPosts.push({
                    ...likedPost,
                    likes: 0,
                    shares: 0,
                    reshareOf: likedPost.text,
                    date: new Date().toISOString(),
                    status: "Draft"
                });
                newState = addAlert({ ...newState, posts: updatedPosts }, `Post reshared: "${likedPost.text}"`);
            } else {
                newState = addAlert(newState, `Post liked: "${likedPost.text}"`);
            }

            saveToLocalStorage(newState);
            return newState;
        }

        case "SHARE_POST": {
            const updatedPosts = state.posts.map((post, i) =>
                i === action.index ? { ...post, shares: post.shares + 1 } : post
            );

            newState = { ...state, posts: updatedPosts };
            newState = addAlert(newState, `Post shared: "${state.posts[action.index].text}"`);
            return newState;
        }

        case "EDIT_POST": {
            const updatedPosts = state.posts.map((post, i) =>
                i === action.index
                    ? { ...post, ...action.payload, category: detectCategory(action.payload.text || post.text), status: "Pending Review" }
                    : post
            );

            newState = { ...state, posts: updatedPosts };
            newState = addAlert(newState, `Post edited: "${state.posts[action.index].text}"`);
            return newState;
        }

        case "DELETE_POST": {
            const filteredPosts = state.posts.filter((_, i) => i !== action.index);
            newState = { ...state, posts: filteredPosts };
            newState = addAlert(newState, "Post deleted");
            return newState;
        }

        case "CLEAR_ALERTS": {
            newState = { ...state, alerts: [] };
            saveToLocalStorage(newState);
            return newState;
        }

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