import React, { Component } from 'react';
import styles from './index.less'
import { Link } from 'react-router-dom'
import historyUrl from '../../history';
export default class Footer extends Component {
    constructor(){
        super();
        this.state = {
            footerList: [{
                name: '首页',
                url: historyUrl.home,
            },{
                name: '我的',
                url: historyUrl.personal,
            }]
        };
    }
    render(){
        let data = null;
        let url = this.props.history.location.pathname;
        if(url === historyUrl.home) data = 0;
        if(url === historyUrl.personal) data = 1;
        // console.log('footer',url,data);
        return (
            <ul className="footer">
                {this.state.footerList.map((item,index) => {
                    // return <a key={item.name} className="footer-a" href={item.url}>{item.name}</a>
                    return (
                        <Link to={item.url} key={item.name} className={"footer-a"+(index===data?' active':'')}>{item.name}</Link>
                    )
                })}
            </ul>
        )
    }
    componentDidMount() {
        let width = (100 / this.state.footerList.length) + '%';
        $('.footer-a').css('width',width);
    }
}