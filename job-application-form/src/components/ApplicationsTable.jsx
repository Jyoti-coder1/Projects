import { useSelector } from "react-redux";

function ApplicationsTable() {
    const applications = useSelector((state) => state.applications.list);

    return (
        <div className="card">
            <h2>Submitted Applications</h2>
            {applications.length === 0 ? (
                <p>No applications submitted yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Resume</th>
                            <th>Skills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={index}>
                                <td>{app.name}</td>
                                <td>{app.email}</td>
                                <td>{app.resume}</td>
                                <td>{app.skills.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ApplicationsTable;