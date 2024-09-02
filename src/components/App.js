import React from 'react';
import Assistant from './Assistant';
import '../App.css'; 

function App() {
    return (
        <div className="main">
            <div className="image-container">
                <div className="image">
                <img src={`/giphy.gif`} alt="Giphy" />
                </div>
                <h1>T A R A</h1>
                <p>I'm your Virtual Assistant TARA, How may I help you?</p>
            </div>
            <Assistant />
        </div>
    );
}

export default App;
