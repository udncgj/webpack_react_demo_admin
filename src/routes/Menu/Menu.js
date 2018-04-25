import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Icon, Divider, message } from 'antd';
import { setAppState } from '../../actions';
import { date, form, urlSearch } from '../../utils/service.js';
import request from '../../utils/request';
import cookie from '../../utils/cookie'
import historyUrl from '../../history';

import './Menu.less'

import ModelConfirm from '../../components/ModelConfirm';
import ModelForm from '../../components/ModelForm';

class Menu extends React.Component {
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
      pageData: { 
        page: searchData.page ? parseInt(searchData.page) : 1, 
        size: searchData.size ? parseInt(searchData.size) : 10, 
        parentId: props.match.params.parentId ? props.match.params.parentId : null, 
        count: 0, 
      },
      columns: [
        {
          title: '编号', dataIndex: 'key', key: 'key',
        }, 
        {
          title: '名称', dataIndex: 'name', key: 'name',
          render: (text, item) => <Link 
            to={`${historyUrl.menu.path}/${item.id}`}
            replace={`${historyUrl.menu.path}/${item.id}` === props.location.pathname}
            // onClick={()=>{this.state.pageData.parentId=item.id;this.fetch('menuGet')}}
          >{text}</Link>,
        }, 
        {
          title: '路径', dataIndex: 'path', key: 'path',
        }, 
        {
          title: '修改时间', dataIndex: 'updateTime', key: 'updateTime',
          render: text => date.ymd(text),
        }, 
        {
          title: '修改用户', dataIndex: 'updateAt', key: 'updateAt',
        }, 
        {
          title: '操作', key: 'action',
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
              {text.key === 1 && this.state.pageData.page === 1 || <Divider type="vertical" />}
              {text.key === 1 && this.state.pageData.page === 1 || <a href="javascript:;" onClick={(e)=>this.fetch('menuUpDown',{id:text.id,moveStr:'up'})}>上移</a>}
              {text.key+(this.state.pageData.page-1)*this.state.pageData.size === this.state.pageData.count || <Divider type="vertical" />}
              {text.key+(this.state.pageData.page-1)*this.state.pageData.size === this.state.pageData.count || <a href="javascript:;" onClick={(e)=>this.fetch('menuUpDown',{id:text.id,moveStr:'down'})}>下移</a>}
            </span>
          )},
      }],
      modelConfirm: {
        ModalText: '',
        visible: false,
        confirmLoading: false,
        onConfirm: null,
        onCancel: this.onCancel,
        confirmValue: {},
      },
      modelForm: {
        titleText: '',
        ModalText: '',
        visible: false,
        confirmLoading: false,
        onConfirm: null,
        onCancel: this.onCancel,
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
    this.fetch = (url,data,fn)=>{
      (async()=>{
        try {
            let resultData = await request(url,form.jsonUrl({...this.state.pageData, ...data}));
            this.dataReload(resultData);
            if(fn){
              fn();
            }
        } catch(e) {
            console.log("Oops, error", e);
        }
      })();
    }
    // this.fetch('menuGet');
    this.edit = (text) => {
      console.log('edit',text);
      this.setState({modelForm:{
        ...this.state.modelForm,
        confirmLoading: true,
        onCancel: null,
      }});
      this.fetch('menuEdit',text,()=>{
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
      // console.log('page', page, pageSize);
      // this.setState({pageData: {...this.state.pageData, page: page, size: pageSize}});
      this.state.pageData.page = page;
      this.state.pageData.size = pageSize;
      this.fetch('menuGet');
      // console.log(this.state.pageData);
      let routerHistory = this.props.history;
      // console.log(this.props.match.path+'?'+form.jsonUrl({page:page,size:pageSize}));
      routerHistory.replace(this.props.match.path+'?'+form.jsonUrl({page:page,size:pageSize}));
      // routerHistory.location.search = form.jsonUrl({page:page,size:pageSize});
    }
  }
  // componentWillMount(){
  //   // console.log('componentWillMount:1');
  //   (async()=>{
  //     await this.fetch('menuGet');
  //     // console.log('componentWillMount:2');
  //   })();
  // }
  componentDidMount(){
    (async()=>{
      await this.fetch('menuGet');
    })();
  }
  shouldComponentUpdate(nextProps, nextState){
    // console.log('should:pre',this.props, this.state);
    return (this.state != nextState);
  }
  componentWillReceiveProps(nextProps){
    // console.log('componentWillReceiveProps:1');
    let newParentId = nextProps.match.params.parentId;
    const searchData = urlSearch();
    this.state.pageData.page = searchData.page ? parseInt(searchData.page) : 1;
    this.state.pageData.size = searchData.size ? parseInt(searchData.size) : 10;
    if(this.state.pageData.parentId != newParentId){
      this.state.pageData.parentId = newParentId?newParentId:null;
      this.fetch('menuGet');
      // console.log('componentWillReceiveProps:2');
    }
  }
  render() {
    console.log('menu')
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
})(Menu)