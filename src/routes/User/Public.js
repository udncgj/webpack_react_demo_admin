import React, { Component } from 'react';
import './Public.less'

export default class UserChild extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //     };
    // }
    render(){
        let data = this.props.data;
        return (
            <div>
                <div className="user-title">{data.title}</div>
                <form onSubmit={(e) => this.props.submitFun(e,this.props)}>
                    {data.input.map((item) => {
                        return (
                            <label key={item.name} className="user-input">
                                <input name={item.name} type={item.type} placeholder={item.placeholder} />
                            </label>
                        )
                    })}
                    <input type="submit" value={data.submit} className="user-submit" />
                </form>
            </div>
        )
    }
}