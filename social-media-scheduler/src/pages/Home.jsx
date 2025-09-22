import { useContext, useEffect } from "react";
import PostContext from "../context/PostContext";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import CalendarView from "../components/CalendarView";
import Analytics from "../components/Analytics";

function Home() {
    const { state, dispatch } = useContext(PostContext);

    useEffect(() => {
        if (state.alerts.length > 0) {
            const timer = setTimeout(() => {
                dispatch({ type: "CLEAR_ALERTS" });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [state.alerts, dispatch]);

    return (
        <div className="home-container">
            <h1>Social Media Content Scheduler</h1>

            <div className="alerts">
                {state.alerts.map(alert => (
                    <div key={`${alert.id}-${index}`} className="alert">{alert.message}</div>
                ))}
            </div>

            <nav className="nav">
                <a href="#form">New Post</a>
                <a href="#posts">Posts</a>
                <a href="#calendar">Calender</a>
                <a href="#analytics">Analytics</a>
            </nav>

            <section id="form"><PostForm /></section>
            <section id="posts"><PostList /></section>
            <section id="calendar"><CalendarView /></section>
            <section id="analytics"><Analytics /></section>
        </div>
    );
}

export default Home;