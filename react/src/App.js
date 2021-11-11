import React, { Component } from "react";
import { Route, Routes, Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Home from "./components/Home";
import FacultyPage from "./components/Admin/FacultyPage/FacultyPage";
import LoginPage from "./components/Login/LoginPage";
import StudentPage from "./components/Admin/StudentPage/StudentPage"
import Sidebar from "./shared/Sidebar/Sidebar";
import AppPage from "./components/AppPage";
import checkToken from "./services/Utils";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0052F5",
        }
    }
})
class App extends Component {

    constructor(props) {
        super(props);
        this.state = { token: "" }
    }

    componentDidMount() {
        this.setState({
            token: checkToken(),
        })
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Routes>
                    {/* <Route exact path="/" element={<Home />} /> */}
                    <Route exact path="/" element={<AppPage role={this.state.token !== null ? this.state.token.role : null} />}>
                        <Route exact path="faculty" element={<FacultyPage role={this.state.token !== null ? this.state.token.role : null} />} />
                        <Route exact path="students" element={<StudentPage role={this.state.token !== null ? this.state.token.role : null} />} />
                    </Route>
                    {/* <Route exact path="/students" element={<Home />} />
                    <Route exact path="/result" element={<Home />} />
                    <Route exact path="/fee" element={<Home />} />
                    <Route exact path="/attendance" element={<Home />} />*/}
                    <Route exact path="/login" element={<LoginPage />} />
                </Routes>
            </ThemeProvider>
        )
    }
}

export default App;