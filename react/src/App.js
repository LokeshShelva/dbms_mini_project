import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

class App extends Component {
    render() {
        return (
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        )
    }
}

export default App;