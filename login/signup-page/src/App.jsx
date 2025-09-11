import { Routes, Route, Navigate, Link } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/authSlice";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      <nav>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        {isAuthenticated && (
          <button onClick={() => dispatch(logout())}>Logout</button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;