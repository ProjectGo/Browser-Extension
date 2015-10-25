import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './core/containers/App';
import statistics from './core/reducers';

chrome.runtime.onMessage.addListener(request => {
    if (request.action == 'focus_window') {
        window.focus();
    }
});

window.addEventListener('load', function() {
    let rootElement = document.getElementById('wrap');
    let store = createStore(statistics);

    render(
        <Provider store={store}>
            <App />
        </Provider>,
        rootElement
    );

    //если токена нет пересылай на вк или на options?id

    //делаем запрос на сервер по хешу
    //пару хандлеров для ajax запросов на сервер для ДА и НЕТ
});