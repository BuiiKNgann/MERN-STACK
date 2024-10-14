import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
 import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
 import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'

const ProfilePage = () => {
const user = useSelector((state) => state.user)
const [email, setEmail] = useState('')
const [name, setName] = useState('')
const [phone, setPhone] = useState('')
const [address, setAddress] = useState('')
const [avatar, setAvatar] = useState('')

const mutation = useMutationHooks( 
    (id,data) => UserService.updateUser(id, data)
  )

  const dispatch = useDispatch()
 const {data, isPending, isSuccess, isError} = mutation
 console.log('data', data);
 

useEffect(() => {
setEmail(user?.email)
setName(user?.name)
setPhone(user?.phone)
setAddress(user?.address)
setAvatar(user?.avatar)


},[user])

 useEffect(()=>{
    if(isSuccess){
        message.success()
        handleGetDetailsUser(user?.id, user?.access_token)
        
     }else if(isError){
        message.error()
     }
 },[isSuccess, isError])

 const handleGetDetailsUser =async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
  dispatch(UserService.updateUser({...res?.data, access_token: token}))
  }
const handleOnchangeEmail = (value) => {
setEmail(value)
}

const handleOnchangeName = (value) => {
    setName(value)
}

const handleOnchangePhone = (value) => {
    setPhone(value)
}
const handleOnchangeAddress = (value) => {
    setAddress(value)
}

const handleOnchangeAvatar =  (value) => {
    setAvatar(value)
}
const handleUpdate = () => {
    mutation.mutate(user?.id, {email, name, phone, address, avatar})
 

}
  return (
    <div style={{width: '1270px', margin: '0 auto', height: '500px'}}>
        <WrapperHeader>Thông tin người dùng</WrapperHeader>
        <Loading isPending={isPending}>
        <WrapperContentProfile>
        <WrapperInput>
        <WrapperLabel htmlFor="name">Name</WrapperLabel>
        <InputForm style={{width: '300px'}} id="name" value={name}  onChange={handleOnchangeName}/>
        <ButtonComponent
 
  onClick={handleUpdate}
  size={40}
  styleButton={{ 
    height: '30px',
    width: 'fit-content', 
    borderRadius: '4px',
    padding: '2px 6px 6px'
     
  }}
  textButton={'Cập nhật'}
  styleTextButton={{ color: ' rgb(26,148,255)', fontSize: '15px', fontWeight: '700'}}
></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
        <WrapperLabel htmlFor="email">Email</WrapperLabel>
        <InputForm style={{width: '300px'}} id="email" value={email}  onChange={handleOnchangeEmail}/>
        <ButtonComponent
 
  onClick={handleUpdate}
  size={40}
  styleButton={{ 
    height: '30px',
    width: 'fit-content', 
    borderRadius: '4px',
    padding: '2px 6px 6px'
     
  }}
  textButton={'Cập nhật'}
  styleTextButton={{ color: ' rgb(26,148,255)', fontSize: '15px', fontWeight: '700'}}
></ButtonComponent>
        </WrapperInput>

        
        <WrapperInput>
        <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
        <InputForm style={{width: '300px'}} id="phone" value={phone}  onChange={handleOnchangePhone}/>
        <ButtonComponent
 
  onClick={handleUpdate}
  size={40}
  styleButton={{ 
    height: '30px',
    width: 'fit-content', 
    borderRadius: '4px',
    padding: '2px 6px 6px'
     
  }}
  textButton={'Cập nhật'}
  styleTextButton={{ color: ' rgb(26,148,255)', fontSize: '15px', fontWeight: '700'}}
></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
        <WrapperLabel htmlFor="address">Address</WrapperLabel>
        <InputForm style={{width: '300px'}} id="address" value={address}  onChange={handleOnchangeAddress}/>
        <ButtonComponent
 
  onClick={handleUpdate}
  size={40}
  styleButton={{ 
    height: '30px',
    width: 'fit-content', 
    borderRadius: '4px',
    padding: '2px 6px 6px'
     
  }}
  textButton={'Cập nhật'}
  styleTextButton={{ color: ' rgb(26,148,255)', fontSize: '15px', fontWeight: '700'}}
></ButtonComponent>
        </WrapperInput>


        <WrapperInput>
        <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
        <InputForm style={{width: '300px'}} id="avatar" value={avatar}  onChange={handleOnchangeAvatar}/>
        <ButtonComponent
 
  onClick={handleUpdate}
  size={40}
  styleButton={{ 
    height: '30px',
    width: 'fit-content', 
    borderRadius: '4px',
    padding: '2px 6px 6px'
     
  }}
  textButton={'Cập nhật'}
  styleTextButton={{ color: ' rgb(26,148,255)', fontSize: '15px', fontWeight: '700'}}
></ButtonComponent>
        </WrapperInput>
        </WrapperContentProfile>
        </Loading>
    </div>
  )
}

export default ProfilePage