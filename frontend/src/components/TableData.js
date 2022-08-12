import { Table, Tooltip } from 'antd';
import React from 'react';
import { useGlobal } from 'reactn';


const TableData = ({columns,tableData,expand,id,components}) => {

  const [stationId,setStationId] = useGlobal('stationId')
  
  return (
    <div className=''>
      <Table
        id={id}
        components={components}
        // {...tableProps}
        scroll={{y : 600}}
        bordered={true}
        loading={!Boolean(tableData.length)}
        columns={columns}
        dataSource={tableData}
        style={{cursor: 'pointer'}}
        onRow={(record, rowIndex) => {
          return {
            onClick: e => {
              setStationId(record.stationId)
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