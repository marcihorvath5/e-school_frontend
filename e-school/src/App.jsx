import * as React from "react";
import { useState, useEffect } from "react";
import TeacherPage from "./pages/TeacherPage.jsx";
import useDatastore from "./dataStore/DataStore.js";
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
  const setAuthenticated = useDatastore((state) => state.setIsAuthenticated);
  const fetchClasses = useDatastore((state) => state.fetchClasses);
  const isAuthenticated = useDatastore((state) => state.isAuthenticated);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuthenticated(token);
      const fetchData = async () => {
        await fetchClasses();
      };
      fetchData();
    }
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route
          path="/teacher"
          element={<TeacherPage />}
          // element={isAuthenticated ? <TeacherPage /> : <Navigate to={"/"} />}
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
