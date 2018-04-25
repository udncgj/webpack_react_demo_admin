import { local } from './service';
import cookie from './cookie'
import { addTodo, changeTodo, completeTodo, delTodo,setAppState } from '../actions';

function config(props){
    // App.js数据初始化
    let list = local.get('bianchengmaoDataList');
    if(Object.prototype.toString.call(list) === '[object Array]' && !props.states.appState){
        list.forEach((item) => {
            props.dispatch(addTodo(item));
        });
        props.dispatch(setAppState({appState:true}));
    }
    // login state
    let User = cookie.get('jnshuProjectUser');
    if(User){
        props.dispatch(setAppState({loginstate:true}))
    }
}


export default config;