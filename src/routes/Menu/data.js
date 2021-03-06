import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import { date, form } from '../../utils/service.js';
import historyUrl from '../../history';

function columnsReturn(){
  return [
    { title: '编号', dataIndex: 'key', key: 'key', }, 
    { title: '名称', dataIndex: 'name', key: 'name',
      render: (text, item) => <Link 
        to={`${historyUrl.menu.path}/${item.id}`}
        replace={`${historyUrl.menu.path}/${item.id}` === this.props.location.pathname}
      >{text}</Link>,
    }, 
    { title: '路径', dataIndex: 'path', key: 'path', }, 
    { title: '修改时间', dataIndex: 'updateTime', key: 'updateTime',
      render: text => date.ymd(text),
    }, 
    { title: '修改用户', dataIndex: 'updateAt', key: 'updateAt', }, 
    { title: '操作', key: 'action',
      render: (text, record) => {
        return (
        <span>
          <a href="javascript:;" onClick={(e)=>{
            console.log('edit');
            this.setState({modelForm:{
                ...this.state.modelForm,
                titleText: '编辑',
                ModalText: text,
                visible: true,
                onConfirm: this.edit,
              },
              // confirmText: text,
            })}}>编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={(e)=>{
            console.log('delete');
            this.setState({modelConfirm:{
                ...this.state.modelConfirm,
                ModalText: '确定是否删除？',
                visible: true,
                onConfirm: this.delete,
                confirmValue: text,
              },
            })}}>删除</a>
          {text.key === 1 && this.state.pageData.page === 1 || 
            <span>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={(e)=>this.fetch('menuUpDown',{id:text.id,moveStr:'up'})}>上移</a>
            </span>}
          {text.key+(this.state.pageData.page-1)*this.state.pageData.size === this.state.pageData.count || 
            <span>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={(e)=>this.fetch('menuUpDown',{id:text.id,moveStr:'down'})}>下移</a>
            </span>}
        </span>
      )},
  }]
}

export {
  columnsReturn,
}