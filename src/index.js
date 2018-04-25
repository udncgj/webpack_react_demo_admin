import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import AppRouter from './router'
import todoApp from './reducers'

// import './css/public.less';

export let store = createStore(todoApp);

// let rootElement = document.getElementById('root')
render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
)

//判断fetch是否可用
import request from './utils/request'
if(self.fetch) {
    // console.log('fetch');
    // run my fetch request here
} else {
    // console.log('notfetch');
    // do something with XMLHttpRequest?
}