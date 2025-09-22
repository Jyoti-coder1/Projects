import { useState, useContext, useEffect } from "react";
import PostContext from "../context/PostContext";

export default function PostForm() {
    const { dispatch } = useContext(PostContext);
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [platform, setPlatform] = useState("Facebook");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("Draft");
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
        if (!text || !date || !author) return alert("Please enter all fields");
        dispatch({ type: "ADD_POST", payload: { text, date, platform, author, status } });
        setText("");
        setDate("");
        setPlatform("Facebook");
        setAuthor("");
        setStatus("Draft");
        setSuggestedTags([]);
    };

    const handleBulkUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const lines = event.target.result.split("\n");
            const posts = lines
                .slice(1)
                .map((line) => {
                    const [text, date, platform, author] = line.split(",");
                    return { text, date, platform, author };
                })
                .filter((p) => p.text && p.date && p.platform && p.author);
            dispatch({ type: "BULK_UPLOAD", payload: posts });
        };
        reader.readAsText(file);
        e.target.value = null;
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
            <input
                type="text"
                placeholder="Author/Team Member"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Twitter</option>
                <option>LinkedIn</option>
                <option>Pinterest</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Draft">Draft</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Approved">Approved</option>
            </select>

            <button type="submit">Schedule Post</button>
            <input type="file" accept=".csv" onChange={handleBulkUpload} />

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