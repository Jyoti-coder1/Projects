import { useContext } from "react";
import PostContext from "../context/PostContext";

export default function PostList() {
    const { state } = useContext(PostContext);
    if (state.posts.length === 0) return <p>No posts scheduled yet</p>;

    return (
        <div className="post-list">
            {state.posts.map((post, index) => (
                <div key={index} className="post-item">
                    <p>{post.text}</p>
                    <small>Scheduled for: {new Date(post.date).toLocaleString()}</small>
                </div>
            ))}
        </div>
    );
}