import React from 'react';
import { Modal, Button, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, AutoComplete } from 'antd';
import './index.less'
const FormItem = Form.Item;const Option = Select.Option;

class ModelFormClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
    this.validatorName = (rule, value, callback) => {
      // console.log(rule, value, callback);
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
    // this.handleSubmit = (e) => {
    //   e.preventDefault();
    //   this.props.form.validateFieldsAndScroll((err, values) => {
    //     if (!err) {
    //       console.log('Received values of form: ', values);
    //     }
    //   });
    // }
    this.handleCreate = () => {
      const form = this.props.form;
      // console.log('handleCreate',this);
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        // console.log('Received values of form: ', values);
        // form.resetFields();//重置
        this.props.props.onConfirm({...this.props.props.ModalText, ...values});
        form.resetFields();//重置
      });
    }
  }
  render() {
    // console.log('modelForm',this.props);
    const { titleText, visible, confirmLoading, ModalText, onConfirm, onCancel, layout } = this.props.props;
    // console.log('ModalText',ModalText)
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0, },
        sm: { span: 16, offset: 8, },
      },
    };
    
    return (
      <Modal width="700px" 
        title={titleText}
        visible={visible}
        onOk={this.handleCreate}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleCreate}>
            确定
          </Button>,
        ]}
      >
        <Form>
          {
            layout.map((item)=>{
              return (
                <FormItem key={item.key} {...formItemLayout} label={item.name} >
                  {getFieldDecorator(item.key, {
                    initialValue: ModalText[item.key],
                    rules: item.rules,
                  })( <Input /> )}  
                </FormItem>
              )
            })
          }
        </Form>
      </Modal>
    );
  }
}

const ModelForm = Form.create()(ModelFormClass);

export default ModelForm;