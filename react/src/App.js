import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./components/Home";
import LoginPage from "./components/Login/LoginPage";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0052F5",
        }
    }
})
class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<LoginPage />} />
                </Routes>
            </ThemeProvider>
        )
    }
}

export default App;