import { useState } from "react";
import { useDispatch } from "react-redux";
import { addApplication } from "../redux/applicationSlice";

function JobForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        resume: "",
        skills: [],
    });
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                skills: checked
                    ? [...prev.skills, value]
                    : prev.skills.filter((s) => s !== value),
            }));
        }
        else if (type === "file") {
            setFormData((prev) => ({ ...prev, resume: files[0]?.name || "" }));
        }
        else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.resume) {
            alert("Please fill all required fields!");
            return;
        }
        dispatch(addApplication(formData));
        setFormData({ name: "", email: "", resume: "", skills: [] });
    };

    return (
        <div className="card">
            <h2>Job Application Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input type="file" name="resume" onChange={handleChange} required />

                <div>
                    <p><strong>Skills:</strong></p>
                    <label>
                        <input
                            type="checkbox"
                            value="React"
                            checked={formData.skills.includes("React")}
                            onChange={handleChange}
                        />{" "}
                        React
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Redux"
                            checked={formData.skills.includes("Redux")}
                            onChange={handleChange}
                        />{" "}
                        Redux
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Node.js"
                            checked={formData.skills.includes("Node.js")}
                            onChange={handleChange}
                        />{" "}
                        Node.js
                    </label>
                </div>

                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
}

export default JobForm;