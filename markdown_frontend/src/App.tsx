import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Editor from "./components/editor/Editor";
import Signup from "./components/Pages/signUpPage/Signup";
import Login from "./components/Pages/LoginPage/Login";

function App() {
  return (
    <div className="main">
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} /> */
        <Route path="/notes" element={<Editor/>} />
        {/* <Route path="/" element={<Markdownreact />} /> */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
