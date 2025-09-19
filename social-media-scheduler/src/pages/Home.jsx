import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import CalendarView from "../components/CalendarView";
import Analytics from "../components/Analytics";

function Home() {
    return (
        <div className="home-container">
            <h1>Social Media Content Scheduler</h1>
            <PostForm />
            <PostList />
            <CalendarView />
            <Analytics />
        </div>
    );
}

export default Home;