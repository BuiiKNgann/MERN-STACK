import React, { useMemo } from 'react'
import {WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader, WrapperTotal} from './style'
 import {DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons'
 import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Checkbox } from 'antd';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { current } from '@reduxjs/toolkit';
const OrderPage = () => {
    const order = useSelector((state) => state.order)
    const dispatch= useDispatch()
    const onChange = (e) => {
        console.log(`check = ${e.target.value}`);
    };

    const handleChangeCount = (type, idProduct) => {
        if(type === 'increase')
        {
            dispatch(increaseAmount({idProduct}))    
        } else {
            dispatch(decreaseAmount({idProduct}))    
        }

    }
    //tạm tính
    const priceMemo = useMemo(() => {
const result = order?.orderItems?.reduce((total, cur) => {
    return total + ((cur.price * cur.amount))
},0)
return result
    },[order])

// giảm giá 
const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItems?.reduce((total, cur) => {
        return total + ((cur.discount * cur.amount))
    },0)
    if(Number(result)) {
        return result
    }
    return 0
        },[order])

// phí giao hàng
const diliveryPriceMeno = useMemo(() => {
     if(priceMemo > 200000){
        return 10000
     }else {
        return 20000
     }
        },[priceMemo])

// Tổng tiền
const totalPriceMemo = useMemo(() => {
  return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMeno)
       },[priceMemo, priceDiscountMemo, diliveryPriceMeno])

const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({idProduct}))     
}
    const handleOnchangeCheckAll=(e) => {

    }

  
    
    return (
        <div style={{background: '#f5f5fa', width: '100%', height: '100vh'}}>
            <div style={{height: '100%', width: '1270px',margin: '0 auto'}}>
                <h3>Giỏ hàng</h3>
                <div style={{display: 'flex', justifyContent: 'center'}}>

                <WrapperLeft>
                <WrapperStyleHeader>
                    <span style={{display: 'inline-block', width: '390px'}}>
                    <Checkbox onChange={handleOnchangeCheckAll}></Checkbox>
                <span>Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                    </span>
                    <div style={{flex:1, display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{cursor: 'pointer'}}/>
                    </div>
                </WrapperStyleHeader>
                <WrapperListOrder>
                {order?.orderItems?.map((order) =>{
                    {/* console.log('checkOrder',order)
 const priceProduct =  convertPrice(order?.price  * order?.amount) */}
                return(
                    <WrapperItemOrder>
                    <div style={{width: '390px', display:'flex', alignItems:'center',gap:4}}>
                    <Checkbox onChange={onChange}></Checkbox>
                    <img src={order?.image} style={{width: '77px', height: '79px', objectFit: 'cover'}} /> 
                    <div style={{
                        width: 260,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whileSpace: 'nowrap'

                    }}>{order?.name}</div>
                    </div> 
                    <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>
                    <span style={{ fontSize: '13px', color: '#424242' }}>{convertPrice(order?.price)}</span>
                    {/* <WrapperPriceDiscount>
                    {order?.amount}
                    </WrapperPriceDiscount> */}
                </span>
                <WrapperCountOrder>
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product)}>
                    <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                </button>
                <WrapperInputNumber onChange={onChange} defaultValue={order?.amount} value={order?.amount} size="small" />
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product)}>
                    <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                </button>
                </WrapperCountOrder>
                    <span style={{color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500}}>{convertPrice(order?.price *order?.amount)}</span>
                <DeleteOutlined style={{cursor: 'pointer'}} onClick={() => handleDeleteOrder(order?.product)} />
                </div>
                    </WrapperItemOrder>
                )
                } )}
                </WrapperListOrder>
                </WrapperLeft>
                <WrapperRight>
                <div style={{width: '100%'}}>
                <WrapperInfo>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <span>Tạm tính</span>
                        <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceMemo)}</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <span>Giảm giá</span>
                        <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{ `${priceDiscountMemo} %` }</span>
                    </div>
                    
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <span>Phí giao hàng</span>
                        <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(diliveryPriceMeno)}</span>
                    </div>
                    </WrapperInfo>
                    <WrapperTotal>
                    <span>Tổng tiền</span>
                    <span style={{display: 'flex', flexDirection: 'column'}}>
                        <span style={{color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold'}}>{convertPrice(totalPriceMemo)}</span>
                        <span style={{color: '#000', fontSize: '11px'}}>(Đã bao gồm VAT nếu có)</span>
                    </span>
                    </WrapperTotal>
                </div>
                <ButtonComponent
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px',
                                marginTop: '20px',
                                color: '#fff'
                            }}
                            textButton={'Mua hàng'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700'}}
                        />
                </WrapperRight>
                            </div>
                        </div>
                        </div>
                    )
                }

                export default OrderPage