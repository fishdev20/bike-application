import React, { useRef, useState } from 'react';
import { useGlobal } from 'reactn';
import TableData from '../components/TableData';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Tooltip } from 'antd';
import Highlighter from 'react-highlight-words';
import ModalCustom from '../components/ModalCustom';
import '../styles/stations.scss';
import SingleStationView from '../components/SingleStationView';


export default function Stations() {
    const [stations] = useGlobal('stations');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
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

    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div
          style={{
            padding: 8,
          }}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
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
              onClick={() => {
                clearFilters && handleReset(clearFilters)
                handleSearch(selectedKeys, confirm, dataIndex)
              }}
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
        title: 'Station',
        dataIndex: 'number',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        ...getColumnSearchProps('name')
      },
      {
        title: 'Address',
        dataIndex: 'address',
        ...getColumnSearchProps('address')
      },
    ];

    const tableData = stations.map((station,index) => ({
      key: index,
      number: index +1,
      name: station.name,
      address: `${station.address}, ${station.kaupunki}`,
      stationId: station._id ,
  }))

  return (
    <div className='table-container'>
      <div id='station-btn' style={{display:'flex', justifyContent: 'flex-end', marginBottom: '20px', padding: '0 32px'}}>
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
        Coming soon
      </ModalCustom>
      <TableData 
      
        id={'station-table'} 
        loading={!Boolean(tableData.length)}
        columns={columns} 
        tableData={tableData} 
        components={{
          body: {
            row: CustomRow
          }
        }}
      />
      <SingleStationView />
    </div>
  )
}

function CustomRow(props) {
  return (
    <Tooltip title="Click to see station">
      <tr {...props} />
    </Tooltip>
  );
}