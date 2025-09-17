import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

export default function Home() {
    return (
        <div className="home-container">
            <h1>Social Media Content Scheduler</h1>
            <PostForm />
            <PostList />
        </div>
    );
}