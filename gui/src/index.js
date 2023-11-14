import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { DataProvider } from './contexts/DataContext';
import { SelectedItemsProvider } from './contexts/selectedItemsContext';

ReactDOM.render(
    <SelectedItemsProvider>
    <ContextProvider>
    <DataProvider>
    <App />
    </DataProvider>
    </ContextProvider>
    </SelectedItemsProvider>, 
    document.getElementById('root'));