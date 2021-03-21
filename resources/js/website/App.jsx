import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from "react-router-dom";
import Routes from './Routes';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';
import GlobalContext from './GlobalContext';
import Category from './apis/Category';

export default class App extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            categories: []
        }
    }

    componentDidMount()
    {
        Category.getAll().then(response => this.setState({categories: response.data.data}));
    }

    render() {
        return (
            // React Context
            <GlobalContext.Provider value={{categories: this.state.categories}}>
                <Router>
                    <Header />
                    <Routes />
                    <Footer />
                </Router>
            </GlobalContext.Provider>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}