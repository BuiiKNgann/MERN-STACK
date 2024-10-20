import { Table } from 'antd';
import React, { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading';

const TableComponent = (props) => {
    const{selectionType = 'checkbox', data= [], isLoading= false, columns = [] } = props
 
  
    
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
        
          name: record.name,
        }),
      };
      console.log('data', data);
      
  return (
<Loading isLoading={isLoading}>

<Table    
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
</Loading>
     
 
    
  )
}

export default TableComponent