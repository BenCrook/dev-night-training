import React, { Component } from 'react'
import Header from './components/header/header'
import Hero from './components/hero/hero';

class App extends Component {
    render() {
        return (
            <>
                <Header/>
                <Hero />
            </>
        );
    }
}

export default App
