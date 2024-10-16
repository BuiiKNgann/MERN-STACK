import { Badge, Button, Col, Popover } from 'antd';
//import Search from 'antd/lib/transfer/search';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopup } from './style';
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
 import {resetUser} from '../../redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading';


const HeaderComponent = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const dispatch= useDispatch()
    const [loading, setLoading] = useState(false)
const handleNavigateLogin = () =>{
    navigate('/sign-in')
}   

const handleLogout = async() => {
    setLoading(true)
await UserService.logoutUser()
dispatch(resetUser())
setLoading(false)
}
const content = (
    <div>
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
      <WrapperContentPopup>Thông tin người dùng</WrapperContentPopup>
    </div>
  );
console.log('user', user);

    return (
        <div style={{width: '100%', background: 'rgb(26,148,255)', display: 'flex', justifyContent: 'center'}}>

            <WrapperHeader>
                {/* có 24 phần */}
                <Col span={5}>
                    <WrapperTextHeader> LAPTRINHTHATDE</WrapperTextHeader>

                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size="large"
                        
                        textButton="Tìm kiếm"
                        placeholder="input search text"
                         />

                </Col>
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                <Loading isPending={loading}>
                    <WrapperHeaderAccount>

                        <UserOutlined style={{ fontSize: '30px' }} />

{user?.name ? (

    <>
   
    <Popover content={content} trigger="click">
    <div style={{cursor: 'pointer'}}>{user.name}</div>
    </Popover>
     
    </>
) : (
    <div onClick={handleNavigateLogin} style={{cursor: 'pointer'}}>
                            <WrapperTextHeaderSmall style={{ fontSize: '12px' }}>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall style={{ fontSize: '12px' }}>Tài khoản</WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>

                        </div>
)}
                       


                    </WrapperHeaderAccount>
</Loading>
                    <div>
                    <Badge count={4} size="small">
                        <ShoppingCartOutlined style={{ fontSize: '30px', color: "#fff" }} />
                        </Badge>
                        <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>

                    </div>


                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent