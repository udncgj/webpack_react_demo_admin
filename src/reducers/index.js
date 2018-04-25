import { combineReducers } from 'redux';
import { ADD_TODO, CHANGE_TODO, COMPLETE_TODO, DEL_TODO, APP_STATE } from '../actions';

// appState: App.js状态
// loginstate: 登录状态
function states(state={},action) {
  switch (action.type){
    case APP_STATE:
        return {...state, ...action};
    default:
        return state;
  }
  // return state
}


function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      // console.log(state,action);
      return [
        ...state,
        {
          name: action.name,
          age: action.age,
          sex: action.sex,
          headPortrait: action.headPortrait,
          completed: false
        }
      ];
    case CHANGE_TODO:
      // console.log(state, action);
      return state.map((item, index) => {
        if( index === action.index ){
          item.name = action.name;
          item.age = action.age;
          item.sex = action.sex;
          item.headPortrait = action.headPortrait;
        }
        return item;
      });
    case COMPLETE_TODO:
      // console.log(state,action);
      return state.map((item, index) => {
        item.completed = action.index === index? !item.completed : item.completed;//(action.index === index && !item.completed)? true : false; 
        return item;
      });
    case DEL_TODO:
      // console.log(state,action);
      return state.filter((item, index) => {
        return action.index !== index;
      })
    default:
      return state;
  }
}

const todoApp = combineReducers({
  // visibilityFilter,
  todos,
  states,
})

export default todoApp