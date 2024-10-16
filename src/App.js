//import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { isJsonString } from './utils'
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService'
import {useDispatch, useSelector} from 'react-redux'
import { updateUser } from './redux/slides/userSlide'
import axios from 'axios'
import Loading from './components/LoadingComponent/Loading'
import { isPending } from '@reduxjs/toolkit'
//import axios from 'axios'
//import { useQuery } from '@tanstack/react-query'

function App() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false)
  const user = useSelector((state) => state.user)
//   useEffect(() => {
//     setIsPending(true)
// const {storageData, decoded} = handleDecoded()
//  console.log('decodedApp', decoded);
//     if(decoded?.id){
//       handleGetDetailsUser(decoded?.id, storageData)
//     }

//   },[])

useEffect(() => {
  const {storageData, decoded} = handleDecoded()
  if (decoded?.id) {
    handleGetDetailsUser(decoded?.id, storageData)
  } else {
    setIsPending(false) // Không có token hoặc token không hợp lệ
  }
}, [])


  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
console.log('storageData', storageData, isJsonString(storageData));
if(storageData && isJsonString(storageData)) {
  storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData);
   
} 
return {decoded,storageData }
  }
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const {decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime()/1000 ){
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config; // chạy vào config trước khi get details
  }, function (error) {
 
    return Promise.reject(error);
  });



  // const handleGetDetailsUser =async (id, token) => {
  //   const res = await UserService.getDetailsUser(id, token)
  // dispatch(updateUser({...res?.data, access_token: token}))
  //   setIsPending(false)
  // }
  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token)
      dispatch(updateUser({...res?.data, access_token: token}))
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsPending(false) // Đảm bảo cập nhật trạng thái loading
    }
  }

  return (
    <div>
      {isPending ? <Loading isPending={isPending} /> : (
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const ischeckAuth = !route.isPrivate || user.isAdmin
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={ischeckAuth ? route.path : undefined} element={<Layout><Page /></Layout>} />
              )
            })}
          </Routes>
        </Router>
      )}
    </div>
  )
   
}

export default App