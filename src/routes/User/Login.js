import React, { Component } from 'react';
// import './Login.less'
import UserChild from './Public.js';
import request from '../../utils/request';
import {form} from '../../utils/service';
import cookie from '../../utils/cookie';
import historyUrl from '../../history';
import './Login.less';

import { connect } from 'react-redux';
import { setAppState } from '../../actions';
import { DatePicker, message } from 'antd';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                title: '登录',
                input: [{
                    name: 'name',
                    type: 'text',
                    placeholder: '账号',
                },{
                    name: 'password',
                    type: 'password',
                    placeholder: '密码',
                }],
                submit: '登录',
                url: 'login',
            }
        };
    }

    handleSubmit(e) {
        let data = null;
        let formData = null;
        try {
            // console.log('eventTest ',event.type,event);
            data = form.urlData($(e.target).serializeArray());
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
        (async()=>{
            try {
                let resultData = await request('login', data);
                console.log(resultData);
                if(!resultData.code){
                    cookie.set('jnshuProjectUser',resultData.data.dESkey);
                    // console.log('try:',this,e);
                    this.propsData.dispatch(setAppState({loginstate:true}));
                    this.propsData.history.push(historyUrl.personal);
                }else{
                    this.propsData.dispatch(setAppState({loginstate:false}));
                    message.info(resultData.data);
                }
            } catch(e) {
                console.log("Oops, error", e);
                message.info("Oops, error"+e);
            }
        })();
        e.preventDefault();
    }

    render(){
        console.log('login');
        return (
            <div className="user">
                <UserChild propsData={this.props} data={this.state.data} submitFun={this.handleSubmit} />
                <div className="user-other">
                    <span className="user-other-type" onClick={() => this.props.history.push('/user/register')}>用户注册</span>
                    <span className="user-other-wire"></span>
                    <span className="user-other-type">忘记密码</span>
                </div>
            </div>
        )
    }
}

// export default Login
export default connect((state)=>{
    return {
        states: state.states,
    }
})(Login)