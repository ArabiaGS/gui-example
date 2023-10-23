import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { DataProvider } from './contexts/DataContext';

ReactDOM.render(
    <ContextProvider>
    <DataProvider>
    <App />
    </DataProvider>
    </ContextProvider>, 
    document.getElementById('root'));