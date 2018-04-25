import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo, changeTodo, completeTodo, delTodo,setAppState } from '../../actions';

import { local } from '../../utils/service';
import './App.less';

import { Layout, Menu, Icon, Button } from 'antd';

class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(prevState => ({
      words: prevState.words.concat(['marklar'])
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
  
  // 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect((state)=>{
  return {
    visibleTodos: state.todos,
    states: state.states,
  }
})(App)