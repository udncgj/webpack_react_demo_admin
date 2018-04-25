import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from 'antd';
import {
  // HashRouter, hashHistory, Router,
  BrowserRouter as Router,
  BrowserHistory,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';

// import Footer from './components/Footer/index.js'
// import Header from './components/Header/index.js'
import SiderMenu from './components/SiderMenu';

import Error from './routes/Error/Error';
import Login from './routes/User/Login';
import Register from './routes/User/Register';
import App from './routes/App/App';
import Personal from './routes/Personal/Personal';
import Menu from './routes/Menu/Menu';

import styles from './public.less';

import historyUrl from './history';

import { connect } from 'react-redux';
import { setAppState } from './actions';

import config from './utils/config';


const title = '| 后台';

class AppRouter extends Component {
  constructor(props) {
    super(props);
    config(props);
  }
  render() {
    return (
      <Router history={BrowserHistory}>
        <div>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    )
  }
}

class Home extends Component {
  // shouldComponentUpdate(){
  //     return (this.props.history.action === 'pop');
  // }
  render() {
    let match = this.props.match;
    // console.log(props);
    // console.log('home',this.props);
    return (
      <div>
        {/* <Header history={this.props.history} /> */}
        <Switch>
          <Route path='/user' component={User} />
          <Route path='/test' component={Test} />
          <Route path={historyUrl.error.path} component={Error} />
          <Redirect exact from='/' to={historyUrl.menu.path} />
        </Switch>
      </div>
    )
  }
}
class User extends Component {
  render() {
    // console.log('user',this.props);
    return (
      <Switch>
        <Route path={historyUrl.login.path} component={Login} />
        <Route path={historyUrl.register.path} component={Register} />
        {/* <Redirect from='*' to={historyUrl.error} /> */}
      </Switch>
    )
  }
}

class Test extends Component {
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(nextProps, nextState);
  //   return (this.props.history.action === 'POP');
  // }
  render() {
    console.log('main');
    return (
      <SiderMenu props={this.props}>
        
        <Switch>
          <Route path={historyUrl.app.path} component={App} />
          <Route path={historyUrl.personal.path} component={Personal} />
          {/* <Route path={historyUrl.menu.path} component={Menu} /> */}
          <Route exact path={historyUrl.menu.path} render={(props) => { 
              // console.log('no-parentId');
              $('html title').html(`${historyUrl.menu.name} ${title}`); 
              return <Menu match={props.match} history={props.history} location={props.location} /> 
            }} 
          />
          <Route path={`${historyUrl.menu.path}/:parentId`} render={(props) => { 
              // console.log(props.match.params.parentId);
              $('html title').html(`${historyUrl.menu.name} ${title}`); 
              return <Menu match={props.match} history={props.history} location={props.location} /> 
            }} 
          />
          <Redirect from='*' to={historyUrl.error.path} />
        </Switch>
      </SiderMenu>
    )
  }
}

// class Test extends Component {
//   static getDerivedStateFromProps(nextProps, prevState){
//     console.log(nextProps, prevState);
//     return false;
//   }
//   render() {
//     console.log('test');
//     return (
//       <Main props={this.props}>
//         <Switch>
//           <Route path={historyUrl.app.path} component={App} />
//           <Route path={historyUrl.personal.path} component={Personal} />
//           {/* <Route path={historyUrl.menu.path} component={Menu} /> */}
//           <Route exact path={historyUrl.menu.path} render={(props) => { 
//               // console.log('no-parentId');
//               $('html title').html(`${historyUrl.menu.name} ${title}`); 
//               return <Menu match={props.match} history={props.history} location={props.location} /> 
//             }} 
//           />
//           <Route path={`${historyUrl.menu.path}/:parentId`} render={(props) => { 
//               // console.log(props.match.params.parentId);
//               $('html title').html(`${historyUrl.menu.name} ${title}`); 
//               return <Menu match={props.match} history={props.history} location={props.location} /> 
//             }} 
//           />
//           <Redirect from='*' to={historyUrl.error.path} />
//         </Switch>
//       </Main>
//     )
//   }
// }


// export default AppRouter;
export default connect((state) => {
  return {
    states: state.states,
  }
})(AppRouter)