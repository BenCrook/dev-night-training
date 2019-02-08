import React, { Component } from 'react'
import Header from './components/header/header'
import Banner from './components/banner/banner';

class App extends Component {
    render() {
        return (
            <>
                <Header/>
                <Banner />
            </>
        );
    }
}

export default App
