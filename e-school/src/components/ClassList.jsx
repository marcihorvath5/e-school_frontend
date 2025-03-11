import { React, useEffect, useState } from "react";
import useDataStore from "../store/DataStore.jsx";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import StudentList from "./StudentsList.jsx";
import StudentGrades from "./StudentGrade.jsx";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function ClassList() {
  const { cls, fetchClasses, fetchClass, selectedClass, setSelectedClass } =
    useDataStore();

  useEffect(() => {
    fetchClasses();
  }, []);

  const [value, setValue] = useState("kezdolap");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {/* <Tab label="kezdolap" value="kezdolap" /> */}
              {cls.map((item) => (
                <Tab label={item.name} value={item.name} />
              ))}
            </TabList>
          </Box>
          <TabPanel value="kezdolap"></TabPanel>
          {cls.map((item) => (
            <TabPanel value={item.value}>
              <StudentList selectedClassName={value} />
            </TabPanel>
          ))}
        </TabContext>
      </Box>

      {/* {selectedClass && <StudentList selectedClassName={selectedClass} />} */}
      {/* {selectedClass && <StudentGrades />} */}
    </>
  );
}

export default ClassList;
