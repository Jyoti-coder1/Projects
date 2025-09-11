import { useSelector } from "react-redux";

function Dashboard() {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="dashboard">
            <h2>Welcome, {user?.name}</h2>
            <p>Email: {user?.email}</p>
            <p>You are logged in successfully!</p>
        </div>
    );
}

export default Dashboard;