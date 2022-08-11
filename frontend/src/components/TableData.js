import { Table } from 'antd';
import React from 'react';
import { useGlobal } from 'reactn';

const defaultFooter = () => 'Here is footer';

const TableData = ({columns,tableData,expand}) => {

  const [stationId,setStationId] = useGlobal('stationId')
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
        // footer={defaultFooter}
        style={{cursor: 'pointer'}}
        onRow={(record, rowIndex) => {
          return {
            onClick: e => {
              console.log(record)
              setStationId(record.description.props.stationId)
              const section = document.getElementById('expand-data')
              section.scrollIntoView({ behavior: 'smooth' })
            }
          }
        }}
      />
    </div>
  );
};

export default TableData;