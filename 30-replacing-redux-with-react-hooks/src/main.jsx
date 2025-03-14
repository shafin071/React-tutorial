import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import productReducer from './store/reducers/products';

// const rootReducer = combineReducers({
//         shop: productReducer,
// });

// const store = configureStore(rootReducer);

const store = createStore(productReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
                <BrowserRouter>
                        <App />
                </BrowserRouter>
        </Provider>
);
