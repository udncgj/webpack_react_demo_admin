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

import SiderMenu from './components/SiderMenu';

import Error from './routes/Error';
import Login from './routes/User/Login';
import Register from './routes/User/Register';
import App from './routes/App';
import Personal from './routes/Personal';
import Menu from './routes/Menu';
import Role from './routes/Role';

import styles from './public.less';

import historyUrl from './history';

import { connect } from 'react-redux';
import { setAppState } from './actions';

import config from './utils/config';
import { menuData } from './components/SiderMenu/SiderMenu.js';


class AppRouter extends Component {
  constructor(props) {
    super(props);
    config(props);
    // console.log('route',props);
  }
  render() {
    return (
      <Router history={BrowserHistory}>
        <div>
          {/* <Switch>
            <Route path="/" component={Home} />
          </Switch> */}
          <Switch>
            <Route path='/user' component={User} />
            <Route path='/test' component={Test} />
            <Route path={historyUrl.error.path} component={Error} />
            <Redirect exact from='/' to={historyUrl.role.path} />
          </Switch>
        </div>
      </Router>
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
  constructor(props) {
    super(props);
    this.pageHeader = (pathname)=>{
      let pathnameArr = pathname.split('/').splice(1);
      let statePathArr = [];
      let forData = menuData;
      for(let x in pathnameArr){
        if(forData === false){
          statePathArr[x] = pathnameArr[x];
        }else{
          for(let i in forData){
            if(forData[i].path === pathnameArr[x]){
              statePathArr[x] = forData[i];
              const title = '| 后台';
              $('html title').html(`${forData[i].name} ${title}`);
            }
          }
          if(statePathArr[x].children){
            forData = statePathArr[x].children;
          }else{
            forData = false;
          }
        }
      }
      return statePathArr;
    }
  }
  // shouldComponentUpdate(a,b){
  //   console.log(a,b)
  //   return next.history.action === "POP";
  // }
  render() {
    // console.log('aa');
    const pageHeader = this.pageHeader(this.props.location.pathname);
    return (
      <SiderMenu props={this.props} pageHeader={pageHeader} >
        
        <Switch>
          <Route path={historyUrl.app.path} component={App} />
          <Route path={historyUrl.personal.path} component={Personal} />
          <Route exact path={historyUrl.menu.path} component={Menu} />
          <Route path={`${historyUrl.menu.path}/:parentId`} component={Menu} />
          <Route path={historyUrl.role.path} component={Role} />
          {/* <Route exact path={historyUrl.menu.path} render={(props) => { 
              return <Menu match={props.match} history={props.history} location={props.location} /> 
            }} 
          />
          <Route path={`${historyUrl.menu.path}/:parentId`} render={(props) => { 
              return <Menu match={props.match} history={props.history} location={props.location} /> 
            }} 
          />
          <Route path={historyUrl.role.path} render={(props) => { 
              return <Role match={props.match} history={props.history} location={props.location} /> 
            }} 
          /> */}
          <Redirect from='*' to={historyUrl.error.path} />
        </Switch>
      </SiderMenu>
    )
  }
}

// export default AppRouter;
export default connect((state) => {
  return {
    states: state.states,
  }
})(AppRouter)