import React from 'react';
import Header from './header'
import Game from './game';
import './App.scss';

function App() {
    return (
        <div className="App">
            <Header title='Game of Life'/>

            <div className='view-wrapper'>
                <Game/>
            </div>
        </div>
    );
}

export default App;
