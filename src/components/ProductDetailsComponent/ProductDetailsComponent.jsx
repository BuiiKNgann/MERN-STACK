import {Col, Row, Image} from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/test.jpg.webp'
import imageProductSmall from '../../assets/images/test1.jpg.webp'
import { WrapperStyleColImage, WrapperStyleImageSmall } from './style'
const ProductDetailsComponent = () => {
  return (
    <Row style={{padding: '16px', background: '#fff'}}>
    <Col span={10}>
        <Image src={imageProduct} alt="image" preview={false}/>
        <Row style={{paddingTop: '10px', justifyContent: "space-between"}}>

<WrapperStyleColImage span= {4}> 
            <WrapperStyleImageSmall src={imageProductSmall}  alt="image small" preview={false}/>
            </WrapperStyleColImage>

            <WrapperStyleColImage span= {4} style> 
            <WrapperStyleImageSmall src={imageProductSmall}  alt="image small" preview={false}/>
            </WrapperStyleColImage>

            <WrapperStyleColImage span= {4}>
            <WrapperStyleImageSmall src={imageProductSmall}  alt="image small" preview={false}/>
            </WrapperStyleColImage>

            <WrapperStyleColImage span= {4}>
            <WrapperStyleImageSmall src={imageProductSmall}  alt="image small" preview={false}/>
            </WrapperStyleColImage>

            <WrapperStyleColImage span= {4}>
            <WrapperStyleImageSmall src={imageProductSmall}  alt="image small" preview={false}/>
            </WrapperStyleColImage>
            <WrapperStyleColImage span= {4}>
            <WrapperStyleImageSmall src={imageProductSmall}  alt="image small" preview={false}/>
            </WrapperStyleColImage>
        </Row>
    </Col>
    <Col span={14}>col-12</Col>
  </Row>
  )
}

export default ProductDetailsComponent