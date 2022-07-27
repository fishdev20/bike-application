import { Table } from 'antd';
import React from 'react';
;

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