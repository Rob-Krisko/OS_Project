import React, { useState } from 'react';
import Clock from './Clock';
import StartMenu from './StartMenu';

function Toolbar({ openApp }) {
    const [startMenuOpen, setStartMenuOpen] = useState(false);

    const buttonStyle = {
        marginRight: '10px', 
        borderRadius: '5px', 
        border: '1px solid #000', 
        padding: '5px 10px', 
        cursor: 'pointer'
    };

    return (
        <div style={{position: 'fixed', bottom: 0, width: '100%', background: '#ccc', display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
            <div>
                <button style={buttonStyle} onClick={() => setStartMenuOpen(!startMenuOpen)}>Start</button>
                {startMenuOpen && <StartMenu openApp={openApp} />}
                <button style={buttonStyle} onClick={() => openApp('Text Editor')}>Text Editor</button>
                <button style={buttonStyle} onClick={() => openApp('Calculator')}>Calculator</button>
                {/* Add more apps as needed */}
            </div>
            <Clock />
        </div>
    );
}

export default Toolbar;
