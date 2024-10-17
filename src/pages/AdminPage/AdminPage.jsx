import React, { useState } from 'react'
import {Menu} from 'antd'
import { getItem } from '../../utils';
import {UserOutlined, AppstoreOutlined,  } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
const AdminPage = () => {
  const items = [
    getItem('Người dùng', 'sub1', <UserOutlined />),
    getItem('Sản phẩm', 'sub2', <AppstoreOutlined />),
    
  ];

  const rootSubmenuKeys = ['user', 'product'];
  const [openKeys, setOpenKeys] = useState(['user']);
const [keySelected, setKeySelected] = useState('')
  const onOpenChange = (keys) => {
 
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const handleOnClick = ({key}) => {
 
setKeySelected(key)
  }
  return (
    <>
    <HeaderComponent isHiddenSearch isHiddenCart />
    <div style={{display: 'flex', }}>
    <Menu
    mode="inline"
    openKeys={openKeys}
    onOpenChange={onOpenChange}
    style={{
      width: 256,
    }}
    items={items}
    onClick={handleOnClick}
  />
 <div style={{flex: 1}}>
 {keySelected === '6' && <span>key la 6</span>}
 <span>test</span>
  </div>
  </div>
  </>
  )
}

export default AdminPage