import React, { useEffect, useRef, useState } from 'react';
import { useGlobal } from 'reactn';
import { fetchData } from '../data/fetchData';
import TableData from './TableData';

import '../styles/stations.scss'
import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import ModalCustom from './ModalCustom';


export default function Journeys() {
    const [journeys, setJourneys] = useGlobal('journeys');

    const journeyUrl = `http://localhost:9000/api/journeys`
    useEffect(() => {
        fetchData(setJourneys,journeyUrl);
    },[])


    

    // console.log(stations)
    // const obj = stations.reduce((x,y)=>{
    //     if(x[y.departureStationName]) {
    //         x[y.departureStationName]++;
    //         return x;
    //     } else {
    //         let z={};
    //         z[y.departureStationName]=1;
    //         return Object.assign(x,z);
    //     }},{})
    // console.log(obj)

    // const sort = Object.entries(obj).map(value => value)
    // console.log(sort)
    // console.log(sort.map(e => ({ name: e[0], amount: e[1] }))
    // )

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const searchInput = useRef(null);


    const showModal = () => {
      setVisible(true);
    };
    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setVisible(false);
      }, 3000);
    };

    const handleCancel = () => {
      setVisible(false);
    };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex,title) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

    const columns = [
      {
        title: 'Journeys',
        dataIndex: 'journeys',
      },
      {
        title: 'Departure station',
        dataIndex: 'departureStationName',
        ...getColumnSearchProps('departureStationName', 'station')
      },
      {
        title: 'Return station',
        dataIndex: 'returnStationName',
        ...getColumnSearchProps('returnStationName', 'station')
      },
      {
        title: 'Distance',
        dataIndex: 'distance',
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
      }
    ];
    console.log(journeys)
    const tableData = journeys.map((journey,index) => ({
      key: index,
      journeys: index + 1,
      departureStationName: journey.departureStationName,
      returnStationName: journey.returnStationName,
      distance: `${journey.distance} km`,
      duration: `${journey.duration} minutes`,
  }))

  return (
    <div className='table-container'>
      <div style={{display:'flex', justifyContent: 'flex-end', marginBottom: '20px', padding: '0 32px'}}>
        <Button 
          onClick={showModal}
          className='btn-add'
        >
          Add new station
        </Button>
      </div>
      
      <ModalCustom
        visible={visible}
        loading={loading}
        handleCancel={handleCancel}
        handleOk={handleOk}
      >
        
      </ModalCustom>
      <TableData columns={columns} tableData={tableData}/>
    </div>
  )
}

