import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { addTodo, changeTodo, completeTodo, delTodo,setAppState } from '../../actions';

// import { local } from '../../utils/service';

import { Layout, Menu, Icon, Button } from 'antd';
import { WelcomeDialog, MenuList, formatter, menuData } from './SiderMenu';
import { Link } from 'react-router-dom';
import antdMethod from '../../utils/antdMethod';
import PageHeader from '../PageHeader';
import './index.less';
const { Header, Content, Footer, Sider } = Layout;

class SiderMenu extends React.Component {
  constructor(props) {
    super(props);
    this.rootSubmenuKeys = formatter(menuData).map((item)=>item.path);//['sub1', 'sub2', 'sub4'];
    this.state = {
      openKeys: ['/'+props.pageHeader[0].path],
      keys: ['/'+props.pageHeader[0].path],
      selectKeys: ['/'+props.pageHeader[0].path+'/'+props.pageHeader[1].path],
      collapsed: false,
      pageHeader: props.pageHeader,
    };
    this.onOpenChange = (openKeys) => {
      // console.log(data);
      // let openKeys = data.keyPath;
      console.log(openKeys);
      const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.setState({ openKeys, keys:openKeys });
      } else {
        let key = latestOpenKey ? [latestOpenKey] : [];
        this.setState({
          openKeys: key,
          keys: key,
        });
      }
    };
    this.toggle = () => {
      let keyStatue = false;
      if(!this.state.collapsed){
        keyStatue = true;
      }
      this.setState({
        collapsed: !this.state.collapsed,
        keys: keyStatue ? [] : this.state.openKeys,
      });
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('componentWillUpdate',this.props != nextProps,nextProps, nextState);
  //   console.log('componentWillUpdate',this.state != nextState,this.props, this.state);
  //   return true;//(this.state != nextState || this.props != nextProps);
  // }
  // componentDidUpdate(nextProps, nextState){
  //   console.log('componentWillUpdate',nextProps, nextState);
  //   console.log('componentWillUpdate',this.props, this.state);
  //   if(nextProps.props.location.pathname != this.props.props.location.pathname){
  //     // console.log(nextProps.location.pathname,this.props.location.pathname);
  //     this.setState({pageHeader:nextProps.pageHeader});
  //   }
  // }
  
  // shouldComponentUpdate(nextProps, nextState){
  //   // console.log('should:pre',this.props, this.state);
  //   return true;
  // }
  render() {
    // const { dispatch, visibleTodos } = this.props;//, visibilityFilter
    const SubMenu = Menu.SubMenu;
    const Item = Menu.Item;
    // console.log('menu',this.props);
    const { history, location, match } = this.props.props;
    // console.log('sidermenu',this.props.pageHeader);
    return (
      <div>
        <Layout>
          <Sider width="256"
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo"><a href="/"><Icon type="table" /><h1>demo</h1></a></div>
            <MenuList location={location} state={this.state} onOpenChange={this.onOpenChange} />
          </Sider>
          <Layout className="layout-body">
            <Header style={{ background: '#fff', padding: 0 }} >
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content>
              <PageHeader pageHeader={this.props.pageHeader} match={match} history={history} location={location} />
              <div className="content-body">{this.props.children}</div>
            </Content>
            <Footer>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default SiderMenu;
  // 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
// export default connect((state)=>{
//   return {
//     visibleTodos: state.todos,
//     states: state.states,
//   }
// })(SiderMenu)