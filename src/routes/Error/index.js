import React, { Component } from 'react';

export default class Error extends Component{
    render(){
        console.log('error',this.props.history);
        return (
            <div>
                <h2>404</h2>
                <h4>not found {this.props.history.location.pathname}</h4>
            </div>
        )
    }
}