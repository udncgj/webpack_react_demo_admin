import React, { Component } from 'react';
// import './Login.less'
import UserChild from './Public.js'

export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            data: {
                title: '注册',
                input: [{
                    name: 'userName',
                    type: 'text',
                    placeholder: '账号',
                },{
                    name: 'password',
                    type: 'password',
                    placeholder: '密码',
                }],
                submit: '注册'
            }
        };
    }

    handleSubmit(event) {
        console.log('Registerform');
        event.preventDefault();
    }

    render(){
        return (
            <div className="user">
                <UserChild data={this.state.data} submitFun={this.handleSubmit} />
                <div className="user-other box-center">
                    {/* <span className="user-other-type" onClick={() => this.props.history.push('/login')}>用户登录</span> */}
                </div>
            </div>
        )
    }
}