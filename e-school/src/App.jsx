import { useEffect, useState } from "react";
import "./App.css";
import useDataStore from "./store/DataStore.jsx";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import StudentList from "./components/StudentsList.jsx";
import StudentGrades from "./components/StudentGrade.jsx";
import ClassList from "./components/ClassList.jsx";

function App() {
  // const [selectedClassName, setSelectedClassName] = useState(null);

  return (
    <>
      <ClassList />
    </>
  );
}

export default App;
