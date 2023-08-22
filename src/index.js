import React from 'react';
import { createRoot } from 'react-dom/client';

// import { WidgetOld } from './widget_old.js';
import { Widget } from './widget.js';
import './app.scss';


function App() {
    return (
        <div className="App">
            <Widget />
        </div>
    );

}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);