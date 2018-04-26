import React from 'react';

import { Layout, Menu, Icon, Button } from 'antd';

import { Link } from 'react-router-dom';
import antdMethod from '../../utils/antdMethod';

export const menuData = [
  {
    name: '测试页', icon: 'test', path: 'test', children: [
      { name: 'App', path: 'app', }, 
      { name: '个人', path: 'personal', }, 
      { name: '菜单管理', path: 'menu', }, 
      { name: '角色管理', path: 'role', }
    ],// hideInMenu: true, 
  }, 
  { 
    name: '表单页', icon: 'form', path: 'form', children: [
      { name: '基础表单', path: 'basic-form', }, 
      { name: '分步表单', path: 'step-form', }, 
      { name: '高级表单', authority: 'admin', path: 'advanced-form', }
    ],
  },
  { 
    name: '列表页', icon: 'table', path: 'list', children: [
      { name: '查询表格', path: 'table-list', }, 
      { name: '标准列表', path: 'basic-list', }, 
      { name: '卡片列表',  path: 'card-list', }, 
      { 
        name: '搜索列表', path: 'search', children: [
          { name: '搜索列表（文章）', path: 'articles', }, 
          { name: '搜索列表（项目）', path: 'projects', }, 
          { name: '搜索列表（应用）', path: 'applications', }
        ], 
      }
    ],
  },
  {
    name: '详情页', icon: 'profile', path: 'profile', children: [
      { name: '基础详情页', path: 'basic', }, 
      { name: '高级详情页', path: 'advanced', authority: 'admin', }
    ],
  },
  {
    name: '结果页', icon: 'check-circle-o', path: 'result', children: [
      { name: '成功', path: 'success', }, 
      { name: '失败', path: 'fail', }
    ],
  },
  {
    name: '异常页', icon: 'warning', path: 'exception', children: [
      { name: '403', path: '403', }, 
      { name: '404', path: '404', }, 
      { name: '500', path: '500', }, 
      { name: '触发异常', path: 'trigger', hideInMenu: true, }
    ],
  },
  {
    name: '账户管理', icon: 'user', path: 'user', authority: 'guest', children: [
      { name: '登录', path: 'login', }, 
      { name: '注册', path: 'register', }, 
      { name: '注册结果', path: 'register-result', }
    ],
  },
  {
    name: '权限管理', icon: 'power', path: 'power', children: [
      // { name: '菜单管理', path: 'resource', }, 
      // { name: '角色管理', path: 'role', }, 
    ],
  },
];
/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)##?(?:[\w]*))?)$/g;

function isUrl(path) {
  return reg.test(path);
}

export function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}
/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
  // console.log(item);
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};


export function MenuList(props){
  // console.log(props);
  const SubMenu = Menu.SubMenu;
  const Item = Menu.Item;
  let num = 1;
  let listData = formatter(menuData);
  // console.log(listData);
  const list = (data)=>{
    let Icon = antdMethod.getIcon(data.icon);
    if(data.children){
      return (
        <SubMenu key={data.path} title={
          <span>{Icon}
            <span>{data.name}</span>
          </span>
        }>
          {data.children.map((item)=>list(item))}
        </SubMenu>
      )
    }
    return (<Item key={data.path}><Link 
        to={data.path}
        // target={target}
        replace={data.path === props.location.pathname}
        // onClick={
        //   this.props.isMobile
        //     ? () => {
        //         this.props.onCollapse(true);
        //       }
        //     : undefined
        // }
        key={data.name}
      >{Icon}{data.name}</Link></Item>);
  }
  return (
    <Menu
      mode="inline"
      openKeys={props.state.keys}
      onOpenChange={props.onOpenChange}
      defaultOpenKeys={props.state.keys}
      defaultSelectedKeys={props.state.selectKeys}
      theme="dark"
      inlineCollapsed="false"
    >
      {listData.map((item)=>list(item))}
    </Menu>
  );
}