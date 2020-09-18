import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Header from "./components/Header";
import RecordTemperature from "./components/RecordTemperature";
import Chart from "./components/Chart";

const App = () => (
    <div>
        <Router>
            <Header />
            <Route exact path='/' component={RecordTemperature} />
            <Route exact path='/chart' component={Chart} />
        </Router>
    </div>
)

export default App