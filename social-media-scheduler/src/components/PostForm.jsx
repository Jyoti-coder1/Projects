import { useState, useContext } from "react";
import PostContext from "../context/PostContext";

export default function PostForm() {
    const { dispatch } = useContext(PostContext);
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text || !date) return alert("Please enter post and date");
        dispatch({ type: "ADD_POST", payload: { text, date, likes: 0, shares: 0 } });
        setText("");
        setDate("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Enter post content"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                cols={50}
            />
            <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit">Schedule Post</button>
        </form>
    );
}