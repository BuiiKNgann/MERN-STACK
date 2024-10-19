import React, { useEffect, useState } from 'react'
import { WrapperHeader } from './style'
 import {Button, Form, Modal} from 'antd'
 import {PlusOutlined, DeleteOutlined,EditOutlined }  from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
 import * as message from '../../components/Message/Message'
import InputComponent from '../InputComponent/InputComponent'
import { WrapperUploadFile } from '../../pages/ProfilePage/style'
import { getBase64 } from '../../utils'
import { createProduct } from '../../services/ProductService'
 import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../LoadingComponent/Loading'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const  [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const  [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const user = useSelector((state) => state?.user)
  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: ''
  })
  const [stateProductDetails, setStateProductDetails] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: ''
  })
  const [form] = Form.useForm();
  const mutation = useMutationHooks( 
    (data) =>{
      const { name,
        price,
        description,
        rating,
        image,
        type,
        countInStock
      } = data
    const res =   ProductService.createProduct({ name,
        price,
        description,
        rating,
        image,
        type,
        countInStock
      })
      return res
    }
  )

  const mutationUpdate = useMutationHooks( 
    (data) =>{
      console.log('data',data);
      
      const { id,
        token,
         ...rests
      } = data
    const res =   ProductService.updateProduct( 
      id,
      token,
      rests
      )
      return res
    }
  )

  const getAllProduct = async() => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected)
    if(res?.data){
      setStateProductDetails({
        name: res?.data?.name,
    price: res?.data?.price,
    description: res?.data?.description,
    rating: res?.data?.rating,
    image: res?.data?.image,
    type: res?.data?.type,
    countInStock: res?.data?.countInStock,
      })
    }
   setIsLoadingUpdate(false)
  }

  useEffect(() => {
form.setFieldsValue(stateProductDetails)
  }, [form, stateProductDetails])

  useEffect(() => {
if(rowSelected){
  fetchGetDetailsProduct(rowSelected)
}

  }, [rowSelected])
  console.log('StateProduct', stateProductDetails);
  const handleDetailsProduct = () =>{
    if(rowSelected) {
      setIsLoadingUpdate(true)
      fetchGetDetailsProduct()

    }
    setIsOpenDrawer(true)
   
  }
  const {data, isLoading, isSuccess, isError} = mutation
  const {data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSucessUpdated, isErrorUpdated} = mutationUpdate
  console.log('dataUpdated', dataUpdated);
  
  const {isLoading : isLoadingProducts, data: products} = useQuery({queryKey: ['products'], queryFn:getAllProduct})
  const renderAction = () =>{
    return(
     <div>
      <DeleteOutlined style={{color: 'red', fontSize: '30px', cursor:' pointer'}} />
      <EditOutlined  style={{color: 'orange', fontSize: '30px',cursor:' pointer'}} onClick={handleDetailsProduct}/>
     </div>
    )
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',

    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      
    },
    {
      title: 'Type',
      dataIndex: 'type',
     
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,
    },
  ];
  const dataTable = products?.data?.length && products?.data?.map((product) => {
  return {...product, key: product._id} 
  })
  
  useEffect(() => {
    if(isSuccess && data?.status === 'OK') {
      message.success()
      handleCloseDrawer()
   
    }else if(isError) {
      message.error()
    }
  }, [isSuccess])


  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: '',
      price: '',
      description: '',
      rating: '',
      image: '',
      type: '',
      countInStock: ''
    })
    form.resetFields()
  };

  useEffect(() => {
    if(isSucessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCancel()
   
    }else if(isErrorUpdated) {
      message.error()
    }
  }, [isSucessUpdated])

   const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      price: '',
      description: '',
      rating: '',
      image: '',
      type: '',
      countInStock: ''
    })
    form.resetFields()
  };

console.log('stateProduct', stateProduct);

const onFinish = () => {
  mutation.mutate(stateProduct)
 

}

const handleOnchange = (e) => {
  setStateProduct({
    ...stateProduct,
    [e.target.name]: e.target.value
  })
}


const handleOnchangeDetails = (e) => {
  console.log('check', e.target.name, e.target.value);
  
  setStateProductDetails({
    ...stateProductDetails,
    [e.target.name]: e.target.value
  })
}

const handleOnchangeAvatar = async ({fileList}) => {
  const file = fileList[0]
  if (!file.url && !file.preview) {
   file.preview = await getBase64(file.originFileObj);
 }
 setStateProduct({
  ...stateProduct,
  image:file.preview
 })
 
}

const handleOnchangeAvatarDetails = async ({fileList}) => {
  const file = fileList[0]
  if (!file.url && !file.preview) {
   file.preview = await getBase64(file.originFileObj);
 }
 setStateProductDetails({
  ...stateProductDetails,
  image:file.preview
 })
 
}

console.log('user', user);

const onUpdateProduct = () =>{
mutationUpdate.mutate({id: rowSelected, token: user?.access_token, stateProductDetails })
}

  return (
    <div>
  <WrapperHeader>Quản lý sản phẩm </WrapperHeader>
  <div style={{marginTop: '10px'}}>
  <Button style={{height: '150px', width:'150px', borderRadius: '6px', borderStyle: 'dashed', }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{fontSize: '60px'}} /></Button>
  </div>
  <div style={{marginTop: '20px'}}>
  <TableComponent columns={columns} isLoading={isLoadingProducts} data={dataTable} onRow={(record, rowIndex) => {
    return {
      onClick: event => {
        setRowSelected(record._id)
      },  
       
    };
  }}/>
  </div>
  <Modal title="Tạo sản phẩm" open={isModalOpen}  onCancel={handleCancel} footer={null}>
  <Loading isLoading={isLoading}>
  <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={onFinish}
      autoComplete="on"
      form = {form}
    > 
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your Name!' }]}
      >

        <InputComponent value={stateProduct['name']} onChange={handleOnchange} name="name"/>
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: 'Please input your Type!' }]}
      >
       <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type" />
      </Form.Item>

      <Form.Item
        label="Count inStock"
        name="countInStock"
        rules={[{ required: true, message: 'Please input your count inStock!' }]}
      >
       <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock"  />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input your count price!' }]}
      >
       <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price"  />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input your description!' }]}
      >
       <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
      </Form.Item>

      
      <Form.Item
        label="Rating"
        name="rating"
        rules={[{ required: true, message: 'Please input your rating!' }]}
      >
       <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating"  />
      </Form.Item>

      
      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true, message: 'Please input your image!' }]}
      >
       <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
        <Button>Select File</Button>
          {stateProduct?.image && (
    <img src={stateProduct?.image} style={{
      height: '60px',
      width: '60px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginLeft: '10px'
    }} alt='avatar'/>
  )}
        
      </WrapperUploadFile>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>

      </Form.Item>
       
 

    </Form>
    </Loading>
      </Modal>
<DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose= {() => setIsOpenDrawer(false)} width="90%">
<Loading isLoading={isLoadingUpdate}>
  <Form
      name="basic"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 22}}
      onFinish={onUpdateProduct}
      autoComplete="on"
   form = {form}
    > 
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your Name!' }]}
      >

        <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails} name="name"/>
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: 'Please input your Type!' }]}
      >
       <InputComponent value={stateProductDetails['type']} onChange={handleOnchangeDetails} name="type" />
      </Form.Item>

      <Form.Item
        label="Count inStock"
        name="countInStock"
        rules={[{ required: true, message: 'Please input your count inStock!' }]}
      >
       <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock"  />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input your count price!' }]}
      >
       <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price"  />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input your description!' }]}
      >
       <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description" />
      </Form.Item>

      
      <Form.Item
        label="Rating"
        name="rating"
        rules={[{ required: true, message: 'Please input your rating!' }]}
      >
       <InputComponent value={stateProductDetails.rating} onChange={handleOnchangeDetails} name="rating"  />
      </Form.Item>

      
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
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Apply
        </Button>

      </Form.Item>
       
 

    </Form>
    </Loading>
</DrawerComponent> 
    </div>


  )
}

export default AdminProduct 