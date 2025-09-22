import { useContext, useState } from "react";
import PostContext from "../context/PostContext";

function PostList() {
    const { state, dispatch } = useContext(PostContext);
    const handleLike = (index) => {
        dispatch({ type: "LIKE_POST", index });
    };
    const handleShare = (index) => {
        dispatch({ type: "SHARE_POST", index });
    };
    const handleEdit = (index) => {
        const post = state.posts[index];
        const newText = prompt("Edit post text:", post.text);
        if (newText !== null && newText.trim() !== "") {
            dispatch({ type: "EDIT_POST", index, payload: { text: newText } });
        }
    };
    const handleDelete = (index) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            dispatch({ type: "DELETE_POST", index });
        }
    };

    const postsPerPage = 5;
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = [...state.posts].reverse().slice(startIndex, endIndex);
    const totalPages = Math.ceil(state.posts.length / postsPerPage);

    return (
        <div className="post-list">
            <h2>Scheduled Posts</h2>
            {state.posts.length === 0 && <p>No posts yet</p>}
            {paginatedPosts.map((post, index) => (
                <div key={index} className={`post-item category-${post.category.toLowerCase()}`}>
                    <p>{post.text}</p>
                    <small>Scheduled for: {new Date(post.date).toLocaleString()}</small>
                    <p>Platform: {post.platform}</p>
                    <p>Author: {post.author}</p>
                    <p>Category: {post.category}</p>
                    {post.reshareOf && <p>Reshared from: "{post.reshareOf}"</p>}
                    <p>Category: {post.category}</p>
                    {post.reshareOf && <p>Reshared from: "{post.reshareOf}"</p>}
                    <p>Status: <span className={`status-${post.status.replace(" ","").toLowerCase()}`}>{post.status}</span></p>
                    <div className="engagement">
                        <button onClick={() => handleLike(startIndex + index)} className="like">
                            Like ({post.likes})
                        </button>
                        <button onClick={() => handleShare(startIndex + index)} className="share">
                            Share ({post.shares})
                        </button>
                        <button onClick={() => handleEdit(startIndex + index)}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(startIndex + index)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
                        Prev
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default PostList;