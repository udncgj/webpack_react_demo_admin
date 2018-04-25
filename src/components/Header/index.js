import React, { Component } from 'react';
import './index.less'
import { Link } from 'react-router-dom'
import historyUrl from '../../history';
export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            main: {
                // left: {type:'back',url:null,img:require('../../img/left_arrow.png')},
                title: {name:'主页'},
                right: {type:'Link',url:historyUrl.login,img:require('../../img/bubble.png')},
            },
            login: {
                left: {type:'back',img:require('../../img/left_arrow.png')},
                title: {name: '登录'},
            },
            register: {
                left: {type:'back',img:require('../../img/left_arrow.png')},
                title: {name:'注册'},
            },
            personal: {
                // left: {type:'back',img:require('../../img/left_arrow.png')},
                title: {name:'我的'},
                // right: {type:'Link',url:historyUrl.login,img:require('../../img/settings1.png')},
            },
        };
    }
    headerSet(o){
        if(!o) return null;
        let img = <img src={o.img}/>;
        switch(o.type){
            case "back":
                return <span onClick={()=>history.back(-1)}>{img}</span>; 
                break;
            case "Link":
                return <Link to={o.url} >{img}</Link>; 
                break;
            default: return null;
        }
    }
    render(){
        let data = this.state.main;
        // console.log(this.props);
        let url = this.props.history.location.pathname;
        if(url === historyUrl.login) {data = this.state.login;}
        if(url === historyUrl.register) {data = this.state.register;}
        if(url === historyUrl.personal) {data = this.state.personal;}
        // console.log('header',url,data);
        return (
            <div className="header">
                <div className="header-left">{this.headerSet(data.left)}</div>
                <div className="header-title">{data.title.name}</div>
                <div className="header-right">{this.headerSet(data.right)}</div>
            </div>
        )
    }
    componentDidMount() {
    }
}