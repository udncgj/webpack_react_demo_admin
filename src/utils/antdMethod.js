import React from 'react';
import { Layout, Menu, Icon, Button } from 'antd';

const getIcon = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};
const antdMethod = {
  getIcon,
}
export default antdMethod;