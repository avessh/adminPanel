import { useState } from "react";
<<<<<<< HEAD
import { Routes, Route, Navigate } from "react-router-dom";
=======
import { Routes, Route } from "react-router-dom";
>>>>>>> 29f794ceef7ac2b87ebb2e2110663f5a46dccb08
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Contacts from "./scenes/contacts";
import Teachers from "./scenes/contacts/Teachers"
import Courses from "./scenes/courses/Courses"
import Subject from "./scenes/subject/Subject"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Department from './scenes/department/Department'

<<<<<<< HEAD
//importing login/signup
import Signup from "./components/Singup";
import Main from "./components/Main";
import Login from "./components/Login";

=======
>>>>>>> 29f794ceef7ac2b87ebb2e2110663f5a46dccb08
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
<<<<<<< HEAD
            <Routes>              
            {/* {user && <Route path="/" exact element={<Main />} />} */}
			      <Route path="/signup" exact element={<Signup />} />
			       <Route path="/login" exact element={<Login />} />
			       <Route path="/" element={<Navigate replace to="/login" />} />
              <Route path="/dashboard" element={<Dashboard />} />
=======
            <Routes>
              <Route path="/" element={<Dashboard />} />
>>>>>>> 29f794ceef7ac2b87ebb2e2110663f5a46dccb08
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/subjects" element={<Subject />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/departments" element={<Department/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
