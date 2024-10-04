import { Badge, Col } from 'antd';
//import Search from 'antd/lib/transfer/search';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from './style';
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import React from 'react'

const HeaderComponent = () => {
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
                        bordered={false}
                        textButton="Tìm kiếm"
                        placeholder="input search text"
                         />

                </Col>
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <WrapperHeaderAccount>

                        <UserOutlined style={{ fontSize: '30px' }} />


                        <div>
                            <WrapperTextHeaderSmall style={{ fontSize: '12px' }}>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall style={{ fontSize: '12px' }}>Tài khoản</WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>

                        </div>
                    </WrapperHeaderAccount>

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