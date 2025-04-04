import * as React from "react";
import { useState, useEffect } from "react";
import TeacherPage from "./pages/TeacherPage.jsx";
import useDatastore from "./pages/TeacherPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import api from "./api/axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

function AppContent() {
  const isAuthenticated = useDatastore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route
          path="/teacher"
          element={isAuthenticated ? <TeacherPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// const [isLoggedIn, setIsLoggedIn] = useState(false);
// const [name, setName] = useState("");
// const handleLogin = (name) => {
//   setIsLoggedIn(true);
//   setName(name);
// };

// return (
//   <div>
//     {!isLoggedIn && <TeacherPage />}
//     {isLoggedIn && <LoginPage onLogin={handleLogin} />}
//   </div>
// );
