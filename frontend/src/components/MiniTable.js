import { Table } from 'antd'
import React from 'react'

export default function MiniTable({title, columns , data}) {
  return (
    <Table 
        columns={columns} 
        dataSource={data} 
        size="small" 
        pagination={false} 
        bordered={true}
        title={title}
    />
  )
}
