import React, { Component } from 'react';
import './index.less'
// import { Link } from 'react-router-dom'
// import historyUrl from '../../history';
export default class PageHeader extends Component {
    constructor(props){
        super(props);
    }
    render(){
        // console.log('pageHeader',this.props);
        return (
            <div className="page-header">
                <div className="title">测试页>app</div>
            </div>
        )
    }
}