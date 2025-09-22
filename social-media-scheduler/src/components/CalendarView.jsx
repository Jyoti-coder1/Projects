import { useContext } from "react";
import { PostContext } from "../context/PostContext";

function CalendarView() {
    const { state } = useContext(PostContext);
    const groupedPosts = state.posts.reduce((acc, post) => {
        const dateKey = new Date(post.date).toLocaleDateString();
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(post);
        return acc;
    }, {});
    
    const today = new Date().toLocaleDateString();

    return (
        <div className="calendar-view">
            <h2>Content Calendar</h2>
            {Object.keys(groupedPosts).length === 0 && <p>No posts scheduled</p>}
            {Object.entries(groupedPosts).map(([date, posts], i) => (
                <div key={i} className={`calendar-day ${date === today ? "today" : ""}`}>
                    <h3>{date}</h3>
                    {posts.map((p, idx) => (
                        <p key={idx} className={`category-${p.category.toLowerCase()}`}>• {p.text} ({p.platform})</p>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default CalendarView;