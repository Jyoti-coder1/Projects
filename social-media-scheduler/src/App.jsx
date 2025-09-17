import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { PostProvider } from "./context/PostContext";
import "./App.css"

function App() {
  return (
    <PostProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </PostProvider>
  );
}

export default App;