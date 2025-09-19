import { useContext } from "react";
import { PostContext } from "../context/PostContext";

function Analytics() {
    const { state } = useContext(PostContext);
    const totalLikes = state.posts.reduce((sum, post) => sum + post.likes, 0);
    const totalShares = state.posts.reduce((sum, post) => sum + post.shares, 0);

    return (
        <div className="analytics">
            <h2>Analytics Dashboard</h2>
            <p>Total Posts: {state.posts.length}</p>
            <p>Total Likes: {totalLikes}</p>
            <p>Total Shares: {totalShares}</p>

            <h3>Hashtag Usage</h3>
            {Object.keys(state.hashtags).length === 0 && <p>No hashtags yet</p>}
            <ul>
                {Object.entries(state.hashtags).map(([tag, count], i) => (
                    <li key={i}>{tag}: {count}</li>
                ))}
            </ul>
        </div>
    );
}

export default Analytics;