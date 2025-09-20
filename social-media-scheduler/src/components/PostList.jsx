import { useContext } from "react";
import PostContext from "../context/PostContext";

function PostList() {
    const { state, dispatch } = useContext(PostContext);
    const handleLike = (index) => {
        dispatch({ type: "LIKE_POST", index });
        alert("Post Liked!");
    };
    const handleShare = (index) => {
        dispatch({ type: "SHARE_POST", index });
        alert("Post Shared!");
    };

    return (
        <div className="post-list">
            <h2>Scheduled Posts</h2>
            {state.posts.length === 0 && <p>No posts yet</p>}
            {state.posts.map((post, index) => (
                <div key={index} className="post-item">
                    <p>{post.text}</p>
                    <small>Scheduled for: {new Date(post.date).toLocaleString()}</small>
                    <p>Platform: {post.platform}</p>
                    <p>Author: {post.author}</p>
                    <div className="engagement">
                        <button onClick={() => handleLike(index)}>
                            Like ({post.likes})
                        </button>
                        <button onClick={() => handleShare(index)}>
                            Share ({post.shares})
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostList;