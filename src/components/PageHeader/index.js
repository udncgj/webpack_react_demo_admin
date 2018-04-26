import React, { Component } from 'react';
import './index.less'
// import { Link } from 'react-router-dom'
// import historyUrl from '../../history';
export default class PageHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    // console.log('pageHeader', props);
    this.titleStr = (arr)=>{
      let str='';
      // let arr = pageHeader;
      for(let i in arr){
        // console.log(i);
        if(i==0){
          str = arr[i].name;
        }else{
          str += '>' + (!arr[i].name?arr[i]:arr[i].name);
        }
      }
      return str;
    }
  }
  render() {
    // console.log('pageHeader',this.props);
    const title =  this.titleStr(this.props.pageHeader);
    return (
      <div className="page-header">
        <div className="title">{title}</div>
      </div>
    )
  }
}