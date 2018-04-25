import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import './index.less'
// import { Link } from 'react-router-dom'
// import historyUrl from '../../history';
export default class ModelConfirm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log('ModelConfirm', this.props);
    const { titleText, visible, confirmLoading, ModalText, onConfirm, onCancel } = this.props.props;
    return (
      <Modal title="提示"
        visible={visible}
        onOk={onConfirm}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={onConfirm}>
            确定
          </Button>,
        ]}
      >
        <p>{ModalText}</p>
      </Modal>
    )
  }
  componentDidMount() {
  }
}