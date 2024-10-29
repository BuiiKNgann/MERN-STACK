import React, { useEffect, useMemo, useState } from 'react'
import {Label, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRadio, WrapperRight, WrapperStyleHeader, WrapperTotal} from './style'
 import {DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons'
 import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Button, Checkbox, Form, message, Radio } from 'antd';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { current } from '@reduxjs/toolkit';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
 import * as  UserService from '../../services/UserService';
 import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading';
import { updateUser } from '../../redux/slides/userSlide';

const PaymentPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)

    const [delivery, setDelivery] = useState('fast')
    const [payment, setPayment] = useState('later_money')
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        
      })
      const [form] = Form.useForm();
    const dispatch= useDispatch()
   
    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
          }, [form, stateUserDetails])

    useEffect(() => {
if(isOpenModalUpdateInfo){
    setStateUserDetails({
     
        city: user?.city, 
        name: user?.name,
        address: user?.address,
        phone: user?.phone
    })
}
    }, [isOpenModalUpdateInfo])

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
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
                }else if (priceMemo === 0) {
                    return 0
                    } else {
                    return 20000
                    }
        },[priceMemo])

// Tổng tiền
const totalPriceMemo = useMemo(() => {
  return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMeno)
       },[priceMemo, priceDiscountMemo, diliveryPriceMeno])

       const handleAddOrder = () =>{  
      if(user?.access_token && user?.name && user?.address && user?.phone && user?.city && priceMemo && user?.id ){
        // eslint-disable-next-line no-unused-expressions
        mutationAddOrder.mutate({
          token: user?.access_token, 
          //orderItems: order?.orderItemsSlected
          fullName: user?.name,
          address: user?.address,
          phone:user?.phone,
          city: user?.city,
         paymentMethod: payment,
      itemsPrice: priceMemo,
      shippingPrice: diliveryPriceMeno,
      totalPrice: totalPriceMemo,
      user: user?.id
        }
      )
      }
 
}
console.log('order', order,user);

            const handleCancelUpdate = () => {
                setStateUserDetails({
                    name: '',
                    email: '',
                  phone: '',
                   isAdmin: false,
                  })
                  form.resetFields()
                setIsOpenModalUpdateInfo(false)
            }
  
            const mutationUpdate = useMutationHooks( 
                (data) =>{   
                  const { id,
                    token,
                     ...rests
                  } = data
                const res = UserService.updateUser( 
                  id,
                  { ...rests }, token
                  )
                  return res
                },
               
              )
              const mutationAddOrder = useMutationHooks( 
                (data) =>{   
                  const { token, ...rests } = data
                const res = OrderService.createOrder( 
                  { ...rests }, token
                  )
                  return res
                },
              )
    const {isLoading, data } = mutationUpdate
const {data: dataAdd,isLoading: isLoadingAddOrder,isSuccess, isError} = mutationAddOrder
    // console.log('data',data);
    useEffect(() => {
      if(isSuccess && dataAdd?.status === 'OK') {
        message.success('Đặt hàng thành công')

      }else if(isError){
        message.error()
      }
    },[isSuccess,isError])
  //   useEffect(() => {
  //     if (isSuccess && dataAdd?.status === 'OK') {
  //         message.success('Đặt hàng thành công');
  //     } else if (isError) {
  //         message.error('Có lỗi xảy ra khi đặt hàng');
  //     }
  // }, [isSuccess, isError, dataAdd?.status]); // Thêm dataAdd?.status vào dependencies
  
const handleUpdateInfoUser = () => {
 console.log('stateUserDetails',stateUserDetails);

const {name, address, city, phone} = stateUserDetails
 if (name && address && city &&phone ) {
    mutationUpdate.mutate({id: user?.id, token: user?.access_token, ...stateUserDetails},{
        onSuccess: () => {
   dispatch(updateUser({name, address, city, phone}))
            setIsOpenModalUpdateInfo(false)
        }
    })
 
 
}
}
// const handleUpdateInfoUser = () => {
//     const { name, address, city, phone } = stateUserDetails;
//     if (name && address && city && phone) {
//         const payload = {
//             id: user?.id,
//             token: user?.access_token,
//             ...stateUserDetails
//         };
        
//         console.log('Payload for update:', payload); // Log the payload

//         mutationUpdate.mutate(payload, {
//             onSuccess: () => {
//                 dispatch(updateUser({ name, address, city, phone }));
//                 setIsOpenModalUpdateInfo(false);
//             },
//             onError: (error) => {
//                 console.error('Update failed:', error); // Log any error
//             }
//         });
//     }
// };
 
    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
          ...stateUserDetails,
          [e.target.name]: e.target.value
        })
      }
      
     const handleDilivery = (e) => {
      setDelivery(e.target.value)
     }
     const handlePayment = (e) => {
      setPayment(e.target.value)
     }
    
    
    return (
        <div style={{background: '#f5f5fa', width: '100%', height: '100vh'}}>
    <Loading isLoading={isLoadingAddOrder}>
            <div style={{height: '100%', width: '1270px',margin: '0 auto'}}>
                <h3>Thanh toán</h3>
                <div style={{display: 'flex', justifyContent: 'center'}}>

                <WrapperLeft>
                <WrapperInfo>
<div>
  <Label>Chọn phương thức giao hàng</Label>
  <WrapperRadio onChange={handleDilivery} value={delivery}>
  <Radio value="fast">
  <span style={{color: '#ea8500', fontWeight: 'bold'}}>FAST</span>
  Giao hàng tiết kiệm
  </Radio>
  <Radio value="gojek">
  <span style={{color: '#ea8500', fontWeight: 'bold'}}>GO_JEK</span>
  Giao hàng tiết kiệm
  </Radio>

  </WrapperRadio>
</div>
                </WrapperInfo>
                <WrapperInfo>
                <div>
                  <Label>Chọn phương thức thanh toán</Label>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="later_money">Thanh toán tiền mặt khi nhận hàng</Radio>
                  </WrapperRadio>
                </div>
                </WrapperInfo>
                </WrapperLeft>
               
                <WrapperRight>
                <WrapperInfo>
                <div>
                    <span>Địa chỉ: </span>
                    <span style={{fontWeight: 'bold'}}>{`${user?.address}- ${user?.city}`}</span>
                    <span onClick={handleChangeAddress}style={{color: 'blue', cursor: 'pointer'}}> Thay đổi</span>
                </div>
                </WrapperInfo>
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
                onClick={() => handleAddOrder()}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '320px',
                                border: 'none',
                                borderRadius: '4px',
                                marginTop: '20px',
                                color: '#fff'
                            }}
                            textButton={'Đặt hàng'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700'}}
                        />
                </WrapperRight>
                            </div>
                        </div>
       <ModalComponent forceRender title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo}  onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
           <Loading isLoading={isLoading}> 
          <div>
       <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20}}
      autoComplete="on"
   form = {form}
    > 
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your Name!' }]}
      >
        <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name"/>
      </Form.Item>

      <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: 'Please input your city!' }]}
      >
        <InputComponent value={stateUserDetails['city']} onChange={handleOnchangeDetails} name="city"/>
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: 'Please input your count address!' }]}
      >
       <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone"  />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please input your count inStock!' }]}
      >
       <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address"  />
      </Form.Item>
       </Form>
          </div> 
             </Loading>  
        </ModalComponent>
        </Loading>
       </div>
         )
             }

  export default PaymentPage