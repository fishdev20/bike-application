import { Button, Input, Space, Table } from 'antd';
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import '../styles/stations.scss'






const defaultFooter = () => 'Here is footer';

const TableData = ({columns,tableData,expand}) => {
  const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
  };
  
  return (
    <div className=''>
      <Table
        // {...tableProps}
        scroll={{y : 600}}
        bordered={true}
        loading={!Boolean(tableData.length)}
        columns={columns}
        dataSource={tableData}
        expandable={expand ? defaultExpandable : ''}
        footer={defaultFooter}
      />
    </div>
  );
};

export default TableData;