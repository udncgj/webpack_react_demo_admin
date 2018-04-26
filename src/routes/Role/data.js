import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import { date, form } from '../../utils/service.js';
import historyUrl from '../../history';

function columnsReturn(){
  return [
    { title: '编号', dataIndex: 'key', key: 'key', }, 
    { title: '名称', dataIndex: 'name', key: 'name', }, 
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
            })}}>权限管理</a>
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
          <Divider type="vertical" />
          <a href="javascript:;" onClick={(e)=>{
              console.log('editState',{...text, state:!text.state});
              this.edit({...text, state:!text.state});
            }}>{text.state?'禁用':'启用'}</a>
        </span>
      )},
  }]
}

export {
  columnsReturn,
}