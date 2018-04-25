import React, { Component } from 'react';
import './Personal.less'
import cookie from '../../utils/cookie'

import { connect } from 'react-redux';
import { setAppState } from '../../actions';
import historyUrl from '../../history';

class Personal extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let loginStatus = this.props.states.loginstate?true:false;
        const { dispatch,history } = this.props;
        return (
            <div className="pessonal">
                {loginStatus?(
                    <div className="p-mes">
                        <div className="p-mes-head"><img src="../../img/user_female.png" /></div>
                        <div className="p-mes-lists">
                            <div className="p-mes-list1">名字先随便吧</div>
                            <div className="p-mes-list2"><span>ID: 123123123</span><span>个人主页 ></span></div>
                            <div className="p-mes-list3"><span>关注 0</span><span>被关注 1</span></div>
                        </div>
                    </div>
                    ) : (
                        <div className="p-mes">
                            <div className="p-mes-head"><img src="../../img/user_female.png" /></div>
                            <div className="p-mes-login">
                                <span onClick={() => history.push(historyUrl.login)}>登录 / 注册</span>
                            </div>
                        </div>
                )}
                {loginStatus && <div className="p-loginOut" onClick={
                    () => {
                        dispatch(setAppState({loginstate:false}));
                        cookie.del('jnshuProjectUser');
                    }}>退出</div>}
            </div>
        )
    }
}

// export default Personal
export default connect((state)=>{
    return {
        states: state.states,
    }
})(Personal)