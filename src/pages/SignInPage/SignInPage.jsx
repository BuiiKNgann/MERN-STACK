import React, {useEffect, useState} from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo-signin.png'
import {Image} from 'antd'
import {
  EyeFilled,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import {useLocation, useNavigate } from 'react-router-dom'
//import { useMutation } from '@tanstack/react-query'
 import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'


const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const location = useLocation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const mutation = useMutationHooks( 
     data => UserService.loginUser(data)
   )
  const {data, isLoading, isSuccess} = mutation
    useEffect(() => {
      console.log('location',location); 
      if(isSuccess){
        if(location?.state){
          navigate(location?.state)
        } else {
          navigate('/')
        }
 
localStorage.setItem('access_token', JSON.stringify(data?.access_token))
  if(data?.access_token){
    const decoded = jwtDecode(data?.access_token);
    
    if(decoded?.id){
      handleGetDetailsUser(decoded?.id,data?.access_token)
    }
  }
}
},[isSuccess])

const handleGetDetailsUser =async (id, token) => {
  const res = await UserService.getDetailsUser(id, token)
dispatch(updateUser({...res?.data, access_token: token}))
}
console.log('mutation', mutation);

  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
     }
     const handleOnchangePassword = (value) => {
      setPassword(value)
       }
      //  const handleSignIn = () => {
      //   mutation.mutate({
      //     email,
      //     password
      //   })
      //   console.log('sign-in', email, password);
        
      //  }
      const handleSignIn = () => {
       
        mutation.mutate({
          email,
          password
        });
        console.log('sign-in', email, password);
      }
    //   const handleSignIn = () => {
    //     // Kiểm tra điều kiện trước khi thực hiện việc đăng nhập
    //     if (!email || !password) {
    //         // Có thể hiển thị thông báo lỗi hoặc không làm gì cả
    //         return;
    //     }
        
    //     // Bắt đầu trạng thái loading
    //     mutation.mutate({
    //         email,
    //         password
    //     });
    //     console.log('sign-in', email, password);
    // };
    
  return (
 <div style={{display:' flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh'}}>
     <div style={{width: '800px', height: '445px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex'}}>
 <WrapperContainerLeft>
  <h1>Xin chào</h1>
  <p>Đăng nhập và tạo tài khoản</p>
  <InputForm style={{marginBottom: '10px'}} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail}/>
  <div style={{position: 'relative'}}>
    <span
    onClick={() => setIsShowPassword(!isShowPassword)}
     style={{
        zIndex: 10,
        position: 'absolute',
        top: '4px',
        right: '8px'
      }}
    >{
 isShowPassword ? (
<EyeFilled />
     ) : (
      <EyeInvisibleOutlined />  
     )
    
    }
    </span>
    <InputForm placeholder="password" 
    type={isShowPassword ? "text" : "password"} value={password}
    onChange={handleOnchangePassword} />
  </div>
   {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}    
   <Loading isLoading={isLoading}>  
   
      <ButtonComponent
  disabled={!email.length || !password.length}
  onClick={handleSignIn}
  size={40}
  styleButton={{ 
    background: 'rgb(255, 57,69)',
    height: '48px',
    width: '100%',
    border: 'none', 
    borderRadius: '4px',
    margin: '26px 0 10px'
  }}
  textButton={'Đăng nhập'}
  styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700'}}
></ButtonComponent>
  </Loading>  
 
      <p> <WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
     
      <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>

 </WrapperContainerLeft>
 <WrapperContainerRight>
  <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width= "203px"/>
 <h4>Mua sắm tại LTTD</h4>
 </WrapperContainerRight>
    </div>
 </div>
  )
}

export default SignInPage