import React from 'react';

function StartMenu({ openApp }) {
    const style = {
        position: 'absolute', 
        bottom: '40px', 
        left: '10px', 
        background: '#fff', 
        padding: '10px', 
        borderRadius: '5px'
    };
    const liStyle = {
        listStyle: 'none', 
        padding: '5px 10px', 
        margin: '5px 0', 
        border: '1px solid #ccc', 
        borderRadius: '5px', 
        cursor: 'pointer'
    };
    const ulStyle = {
        padding: 0
    };

    return (
        <div style={style}>
            <ul style={ulStyle}>
                <li style={liStyle} onClick={() => openApp('Text Editor')}>Text Editor</li>
                <li style={liStyle} onClick={() => openApp('Calculator')}>Calculator</li>
                {/* Add more apps as needed */}
            </ul>
        </div>
    );
}

export default StartMenu;
