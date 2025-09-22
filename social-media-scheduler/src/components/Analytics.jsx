import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Analytics() {
    const { state } = useContext(PostContext);
    const totalLikes = state.posts.reduce((sum, post) => sum + post.likes, 0);
    const totalShares = state.posts.reduce((sum, post) => sum + post.shares, 0);
    const postsByPlatform = state.posts.reduce((acc, post) => {
        acc[post.platform] = acc[post.platform] || { posts: 0, likes: 0, shares: 0 };
        acc[post.platform].posts += 1;
        acc[post.platform].likes += post.likes;
        acc[post.platform].shares += post.shares;
        return acc;
    }, {});
    
    const chartData = Object.entries(postsByPlatform).map(([platform, data]) => ({
        platform,
        posts: data.posts,
        likes: data.likes,
        shares: data.shares,
        engagementRate: ((data.likes + data.shares) / data.posts).toFixed(2)
    }));

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

            <h3>Platform Insights</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray = "3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="posts" fill="#8884d8" />
                    <Bar dataKey="likes" fill="#82ca9d" />
                    <Bar dataKey="shares" fill="#ffc658" />
                </BarChart>
            </ResponsiveContainer>

            <h3>Engagement Rate (Likes+Shares / Posts)</h3>
            <ul>
                {chartData.map((data, i) => (
                    <li key={i}>{data.platform}: {data.engagementRate}</li>
                ))}
            </ul>
        </div>
    );
}

export default Analytics;