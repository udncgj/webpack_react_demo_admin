/*
 * action 类型
 */

const ADD_TODO = 'ADD_TODO';
const CHANGE_TODO = 'CHANGE_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';
const DEL_TODO = 'DEL_TODO';
export const APP_STATE = 'APP_STATE';
// export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * 其它的常量
 */

// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// };

/*
 * action 创建函数
 */

function addTodo(text) {
  return { type: ADD_TODO, name: text.name, age: text.age, sex: text.sex, headPortrait: text.headPortrait }
}

function changeTodo(text, index) {
  return { type: CHANGE_TODO, name: text.name, age: text.age, sex: text.sex, headPortrait: text.headPortrait, index }
}

function completeTodo(index) {
  return { type: COMPLETE_TODO, index }
}

function delTodo(index) {
  return { type: DEL_TODO, index }
}

// export function setVisibilityFilter(filter) {
//   return { type: SET_VISIBILITY_FILTER, filter }
// }
export function setAppState(data) {
  return { type: APP_STATE, ...data }
}
export { ADD_TODO, CHANGE_TODO, COMPLETE_TODO, DEL_TODO, addTodo, changeTodo, completeTodo, delTodo }
