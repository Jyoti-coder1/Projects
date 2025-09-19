import { useState, useContext, useEffect } from "react";
import PostContext from "../context/PostContext";

export default function PostForm() {
    const { dispatch } = useContext(PostContext);
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [suggestedTags, setSuggestedTags] = useState([]);
    const trendingTags = ["#marketing", "#socialMedia", "#branding", "#content", "#growth", "#strategy"];

    useEffect(() => {
        const words = text.split(" ");
        const lastWord = words[words.length - 1];
        if (lastWord.startsWith("#") && lastWord.length > 1) {
            const suggestions = trendingTags.filter(tag => tag.toLowerCase().startsWith(lastWord.toLowerCase()));
            setSuggestedTags(suggestions);
        }
        else {
            setSuggestedTags([]);
        }
    }, [text]);

    const handleHashtagClick = (tag) => {
        const words = text.split(" ");
        words[words.length - 1] = tag;
        setText(words.join(" ") + " ");
        setSuggestedTags([]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text || !date) return alert("Please enter post and date");
        dispatch({ type: "ADD_POST", payload: { text, date } });
        setText("");
        setDate("");
        setSuggestedTags([]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Enter post content (use #hashtags)"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
            />
            <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit">Schedule Post</button>
            {suggestedTags.length > 0 && (
                <div className="suggestions">
                    <p>Suggested Hashtags:</p>
                    {suggestedTags.map((tag, i) => (
                        <span key={i} className="hashtag" onClick={() => handleHashtagClick(tag)}>{tag}</span>
                    ))}
                </div>
            )}
        </form>
    );
}