import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Icon, Divider, message } from 'antd';
import { setAppState } from '../../actions';
import { form, urlSearch, publicRequest } from '../../utils/service.js';
import request from '../../utils/request';
import cookie from '../../utils/cookie';
import historyUrl from '../../history';

import './index.less'
import { columnsReturn } from './data.js';

import ModelConfirm from '../../components/ModelConfirm';
import ModelForm from '../../components/ModelForm';

class Role extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.onCancel = ()=>{
      this.setState({
        modelConfirm: {...this.state.modelConfirm, visible: false},
        modelForm: {...this.state.modelForm, visible: false},
      })
    }
    const searchData = urlSearch();
    this.state = { 
      loading: false,
      columns: columnsReturn.bind(this)(),
      pageData: { 
        page: searchData.page ? parseInt(searchData.page) : 1, 
        size: searchData.size ? parseInt(searchData.size) : 10, 
        parentId: props.match.params.parentId ? props.match.params.parentId : null, 
        count: 0, 
      },
      modelConfirm: {
        ModalText: '', visible: false, confirmLoading: false,
        onConfirm: null, onCancel: this.onCancel, confirmValue: {},
      },
      modelForm: {
        ModalText: '', visible: false, confirmLoading: false,  titleText: '', 
        onConfirm: null, onCancel: this.onCancel,
        layout: [
          {
            name: '名称', key: 'name',
            rules: [
              { required: true, message: 'Please input a name!', }, 
              { validator: this.validatorName, }
            ]
          }, 
          {
            name: '路径', key: 'path',
            rules: [
              { required: true, message: 'Please input a path!', }
            ]
          }
        ]
      },
    };
    this.fetch = (url,data,fn)=>{
      publicRequest.bind(this,url,data,fn)();
    }
    this.dataReload = (resultData)=>{
      if(!resultData.code){
        let data = resultData.data.dataList.map((item, index)=>{
          return {...item, key: index+1}
        });
        this.setState({data: data, pageData: {...this.state.pageData, count: resultData.data.count}});
      }else{
        message.info(resultData.data);
      }
    }
    this.edit = (text) => {
      console.log('edit',text);
      this.setState({modelForm:{
        ...this.state.modelForm,
        confirmLoading: true,
        onCancel: null,
      }});
      this.fetch('roleEdit',text,()=>{
        this.setState({modelForm:{
          ...this.state.modelForm,
          visible: false,
          confirmLoading: false,
          onCancel: this.onCancel,
          ModalText: '',
        }});
      });
    };
    this.delete = (event) => {
      let text = this.state.modelConfirm.confirmValue;
      console.log('delete',text);

      this.setState({modelConfirm:{
        ...this.state.modelConfirm,
        confirmLoading: true,
        onCancel: null,
      }});
      this.fetch('menuDel',{id:text.id},()=>{
        this.setState({modelConfirm:{
          ...this.state.modelConfirm,
          visible: false,
          confirmLoading: false,
          onCancel: this.onCancel,
        }});
      })
    };
    this.add = (text) => {
      console.log('add',text);
      this.setState({modelForm:{
        ...this.state.modelForm,
        confirmLoading: true,
        onCancel: null,
      }});
      this.fetch('menuAdd',text,()=>{
        this.setState({modelForm:{
          ...this.state.modelForm,
          visible: false,
          confirmLoading: false,
          onCancel: this.onCancel,
          ModalText: '',
        }});
      });
    };
    this.pageOnChange = (page, pageSize)=>{
      this.state.pageData.page = page;
      this.state.pageData.size = pageSize;
      this.fetch('roleGet');
      let routerHistory = this.props.history;
      routerHistory.replace(this.props.match.path+'?'+form.jsonUrl({page:page,size:pageSize}));
    }
  }
  componentDidMount(){
    this.fetch('roleGet');
  }
  componentWillReceiveProps(nextProps){
    // console.log('componentWillReceiveProps:1');
    let newParentId = nextProps.match.params.parentId;
    const searchData = urlSearch();
    this.state.pageData.page = searchData.page ? parseInt(searchData.page) : 1;
    this.state.pageData.size = searchData.size ? parseInt(searchData.size) : 10;
    if(this.state.pageData.parentId != newParentId){
      this.state.pageData.parentId = newParentId?newParentId:null;
      this.fetch('roleGet');
    }
  }
  render() {
    console.log('role');
    return (
      <div className="menu">
        <div className="">
          <button type="button" className="ant-btn ant-btn-primary" onClick={(e)=>{
                console.log('edit');
                this.setState({modelForm:{
                    ...this.state.modelForm,
                    titleText: '新增',
                    ModalText: {name:'',path:''},
                    visible: true,
                    onConfirm: this.add,
                  },
                  // confirmText: text,
                })}}>
            <i className="anticon anticon-plus"></i>
            <span>新建</span>
          </button>
        </div>
        <Table 
          columns={this.state.columns} 
          dataSource={this.state.data} 
          loading={this.state.loading}
          pagination={{
            onChange: this.pageOnChange,
            current: this.state.pageData.page,
            pageSize: this.state.pageData.size,
            total: this.state.pageData.count,
          }}
        />
        <ModelConfirm props={this.state.modelConfirm} />
        <ModelForm props={this.state.modelForm} />
      </div>
    )
  }
}

// export default Personal
export default connect((state) => {
  return {
    states: state.states,
  }
})(Role)