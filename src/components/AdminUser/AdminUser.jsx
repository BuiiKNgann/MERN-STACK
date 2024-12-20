import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
 import {Button, Form, Space} from 'antd'
 import {DeleteOutlined, EditOutlined, SearchOutlined}  from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
 
import Loading from '../LoadingComponent/Loading'
import { getBase64 } from '../../utils'
 import * as message from '../../components/Message/Message'
import { useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import { useQuery } from '@tanstack/react-query'


const AdminUser = () => {
  
  const [rowSelected, setRowSelected] = useState('');
  const  [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const  [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete]  = useState(false)
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);
  // const [stateUser, setStateUser] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   isAdmin: false,
    
  // })
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    avatar: '',
    address: ''
    
  })
  const [form] = Form.useForm();
  
  
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

  const mutationDeleted = useMutationHooks( 
    (data) =>{  
      const { id,
        token,
         
      } = data
    const res = UserService.deleteUser( 
      id,
      token
    
      )
      return res
    },
   
  )
// Đã check theo video đến đây
  // const getAllUsers = async () => {
  //   return await UserService.getAllUser(user?.access_token); // Thêm token vào đây
  // };
   

  const getAllUsers = async() => {
    const res = await UserService.getAllUser(user?.access_token)
    return res
  }

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected)
    if(res?.data){
      setStateUserDetails({
    name: res?.data?.name,
    email: res?.data?.email,
    phone: res?.data?.phone,
    isAdmin: res?.data?.isAdmin,
    address: res?.data?.address,
    avatar: res?.data?.avatar,
     
      })
    }
   setIsLoadingUpdate(false)
  }

  useEffect(() => {
form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
if(rowSelected){
  setIsLoadingUpdate(true)
  fetchGetDetailsUser(rowSelected)
}
  }, [rowSelected])
   
  const handleDetailsProduct = () =>{
    setIsOpenDrawer(true)
   
  }

  const {data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSucessUpdated, isError: isErrorUpdated} = mutationUpdate
  const {data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSucessDeleted, isError: isErrorDeleted} = mutationDeleted
  
  const queryUser = useQuery({queryKey: ['users'], queryFn: getAllUsers })
  const {isLoading : isLoadingUsers, data: users} = queryUser
  const renderAction = () =>{
    return(
     <div>
      <DeleteOutlined style={{color: 'red', fontSize: '30px', cursor:' pointer'}} onClick={() => setIsModalOpenDelete(true)}  />
      <EditOutlined  style={{color: 'orange', fontSize: '30px',cursor:' pointer'}} onClick={handleDetailsProduct}/>
     </div>
    )
  }
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      // setSearchText(selectedKeys[0]);
      // setSearchedColumn(dataIndex);
    }
 
  const handleReset = (clearFilters) => {
    clearFilters();
 //   setSearchText('');
  };

  const getColumnSearchProps = (dataIndex)=> ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={`${selectedKeys[0] || ''}`}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>

        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes (value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  
  });


  const columns = [
 
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
        sorter: (a,b) => a.name.length - b.name.length,
        ...getColumnSearchProps('name')
      },
  
      {
        title: 'Email',
        dataIndex: 'email',
      
        sorter: (a,b) => a.email.length - b.email.length,
        ...getColumnSearchProps('email')
      },
  
      {
        title: 'Admin',
        dataIndex: 'isAdmin',
        filters: [
          {
            text: 'True',
            value: true,
          },
          {
            text: 'False',
            value: false,
          },
        ],
      },
  
      {
        title: 'Phone',
        dataIndex: 'phone',
        sorter: (a,b) => a.phone - b.phone,
        ...getColumnSearchProps('phone')
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: renderAction,
      },
  
  
  ];
  const dataTable = users?.data?.length && users?.data?.map((user) => {
    return {...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE': 'FALSE'} 
  })
   


  useEffect(() => {
    if(isSucessDeleted && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    }else if(isErrorDeleted) {
      message.error()
    }
  }, [isSucessDeleted])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: '',
      email: '',
    phone: '',
     isAdmin: false,
    })
    form.resetFields()
  };

  useEffect(() => {
    if(isSucessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCloseDrawer()
    }else if(isErrorUpdated) {
      message.error()
    }
  }, [isSucessUpdated])
  
const handleCancelDelete = () =>{
  setIsModalOpenDelete(false);
   
}

const handleDeleteUser = () => {
mutationDeleted.mutate({id: rowSelected, token: user?.access_token},{
  onSettled: () => {
    queryUser.refetch()
  }
})
}
    
 
 

const handleOnchangeDetails = (e) => {
  setStateUserDetails({
    ...stateUserDetails,
    [e.target.name]: e.target.value
  })
}

const handleOnchangeAvatar = async ({fileList}) => {
  const file = fileList[0]
  if (!file.url && !file.preview) {
   file.preview = await getBase64(file.originFileObj);
 }
//  setStateUser({
//   ...stateUser,
//   image:file.preview
//  })
 
}

const handleOnchangeAvatarDetails = async ({fileList}) => {
  const file = fileList[0]
  if (!file.url && !file.preview) {
   file.preview = await getBase64(file.originFileObj);
 }
 setStateUserDetails({
  ...stateUserDetails,
  image:file.preview
 })
 
}

console.log('user', user);

const onUpdateUser = () =>{
mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateUserDetails}, {
onSettled: () => {
  queryUser.refetch()
}
})
} 

 

  return (
    <div>
  <WrapperHeader>Quản lý người dùng </WrapperHeader>
  {/* <div style={{marginTop: '10px'}}>
  <Button style={{height: '150px', width:'150px', borderRadius: '6px', borderStyle: 'dashed', }}><PlusOutlined style={{fontSize: '60px'}} /></Button>
  </div> */}
  <div style={{marginTop: '20px'}}>
  <TableComponent columns={columns} isLoading={isLoadingUsers} data={dataTable} onRow={(record, rowIndex) => {
    return {
      onClick: event => {
        setRowSelected(record._id)
      },    
       
    };
  }}/>
  </div>
   
<DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose= {() => setIsOpenDrawer(false)} width="90%">
<Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
  <Form
      name="basic"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 22}}
      onFinish={onUpdateUser}
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
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
       <InputComponent value={stateUserDetails['email']} onChange={handleOnchangeDetails} name="email" />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: 'Please input your count inStock!' }]}
      >
       <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone"  />
      </Form.Item>

{/*  
      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true, message: 'Please input your image!' }]}
      >
       <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
        <Button>Select File</Button>
          {stateProductDetails?.image && (
    <img src={stateProductDetails?.image} style={{
      height: '60px',
      width: '60px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginLeft: '10px'
    }} alt='avatar'/>
  )}
        
      </WrapperUploadFile>
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Apply
        </Button>

      </Form.Item>
       
 

    </Form>
    </Loading>
</DrawerComponent> 

<ModalComponent forceRender title="Xoá người dùng" open={isModalOpenDelete}  onCancel={handleCancelDelete} onOk={handleDeleteUser}>
  <Loading isLoading={isLoadingDeleted}>
   <div>
    Bạn có chắc xoá tài khoản này không?
   </div> 
    </Loading>
      </ModalComponent>

    </div>


  )
}

export default AdminUser;
 