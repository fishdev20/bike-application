import { Table } from 'antd';
import React from 'react';
import { useGlobal } from 'reactn';
import { BikeLoading } from '../animation/IconAnimation';


const TableData = ({columns,tableData,expand,id,components,loading}) => {
  const [stationId,setStationId] = useGlobal('stationId')

  const loadingVal = {
    spinning: loading,
    indicator: <BikeLoading/> ,
  }
  
  return (
    <div className=''>
      <Table
        id={id}
        components={components}
        // {...tableProps}
        scroll={{y : 600}}
        bordered={true}
        loading={loadingVal}
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