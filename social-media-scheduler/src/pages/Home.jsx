import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import CalendarView from "../components/CalendarView";

function Home() {
    return (
        <div className="home-container">
            <h1>Social Media Content Scheduler</h1>
            <PostForm />
            <PostList />
            <CalendarView />
        </div>
    );
}

export default Home;