/* eslint-disable default-case */
import React, { useEffect, useRef, useState } from 'react';
import { useGlobal } from 'reactn';
import { fetchData, getStationAndId } from '../data/fetchData';
import TableData from '../components/TableData';
import '../styles/stations.scss'
import { Button, Form, Input, Space, AutoComplete, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import ModalCustom from '../components/ModalCustom';
import { v4 as uuid } from 'uuid';
import { addJourneys } from './../data/fetchData';
import { ToastContainer } from 'react-toastify';

const { Option } = AutoComplete; 

export default function Journeys() {
    const [journeys, setJourneys] = useGlobal('journeys');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [listStation, setListStation] = useState([])
    const [resultStation, setResultStation] = useState([])
    const [stationData, setStationData] = useState({
      departure: '',
      departureId: '',
      departureAt: '',
      return: '',
      returnId: '',
      returnAt: '',
      distance: null,
      duration:  null,
      id: uuid()

    })
    const journeyUrl = `http://localhost:9000/api/journeys`
    const searchInput = useRef(null);

    useEffect(() => {
      getStationAndId(setListStation)
      
    },[])
    useEffect(() => {
      stationData.departure !== '' && addJourneys(stationData)
      stationData.departure !== '' && fetchData(setJourneys,journeyUrl);
    },[stationData])
    console.log(journeys)

    
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

    




  const showModal = () => {
    setVisible(true);
  };
  
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
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
      title: 'Departure time',
      dataIndex: 'departureAt',
    },
    {
      title: 'Return station',
      dataIndex: 'returnStationName',
      ...getColumnSearchProps('returnStationName', 'station')
    },
    {
      title: 'Return time',
      dataIndex: 'returnAt',
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
  const tableData = journeys.reverse().map((journey,index) => ({
    key: index,
    journeys: index + 1,
    departureStationName: journey.departureStationName,
    departureAt: journey.departureAt,
    returnStationName: journey.returnStationName,
    returnAt: journey.returnAt,
    distance: `${journey.distance} km`,
    duration: `${journey.duration} minutes`,
  }))

  
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 2000);
    const saveStation = {
      departure: values.departure,
      departureId: values.departureId,
      departureAt: values.departure_time.format(`YYYY-MM-DDTHH:mm:ss`),
      return: values.return,
      returnId: values.returnId,
      returnAt: values.return_time.format(`YYYY-MM-DDTHH:mm:ss`),
      distance: values.distance,
      duration:  values.duration,
      id: uuid()
    }  
    setStationData(saveStation)
    
    form.resetFields();
  };

  const onFieldsChange = (value) => {
    if (value[0].name[0] === 'departure') {
      if(value[0].value) {
        const optionList = listStation?.filter((station) => station.name.toLowerCase().indexOf(value[0].value) === 0 || station.name.indexOf(value[0].value) === 0)
        const departureId = optionList?.[0].stationId
        setResultStation(optionList);
        form.setFieldsValue({
          departureId: departureId
        })
      }else {
        setResultStation([]);
      }
    } else if(value[0].name[0] === 'return') {
      if(value[0].value) {
        const optionList = listStation?.filter((station) => station.name.toLowerCase().indexOf(value[0].value) === 0 || station.name.indexOf(value[0].value) === 0)
        const returnId = optionList?.[0].stationId
        setResultStation(optionList);
        form.setFieldsValue({
          returnId: returnId
        })
      }else {
        setResultStation([]);
      }
    }

  }
  return (
    <div className='table-container'>
      <div style={{display:'flex', justifyContent: 'flex-end', marginBottom: '20px', padding: '0 32px'}}>
        <Button 
          onClick={showModal}
          className='btn-add'
        >
          Add new journey
        </Button>
      </div>
      
      <ModalCustom
        visible={visible}
        loading={loading}
        handleCancel={handleCancel}
        handleOk={onFinish}
      >
        <Form layout='vertical' form={form} name="control-hooks" onFinish={onFinish} onFieldsChange={onFieldsChange}>
          <Form.Item 
            name="departure"
            label="Departure Station"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoComplete>
              {resultStation?.map((station, idx) => (
                <Option key={idx} value={station.name}>
                  {station.name}
                </Option>
              ))}
            </AutoComplete>
          </Form.Item>
          <Form.Item
            name="departureId"
            label="Departure Station Id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item 
            name="departure_time" 
            label="Departure Time"
            rules={[
              {
                required: true,
                message: 'Please select time!'
              },
            ]}
          >
            <DatePicker style={{width: '100%'}} showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item
            name="return"
            label="Return Station"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoComplete>
              {resultStation?.map((station, idx) => (
                <Option key={idx} value={station.name}>
                  {station.name}
                </Option>
              ))}
            </AutoComplete>
          </Form.Item>
          <Form.Item
            name="returnId"
            label="Return Station Id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item 
            name="return_time" 
            label="Return Time"
            rules={[
              {
                required: true,
                message: 'Please select time!'
              },
            ]}
          >
            <DatePicker style={{width: '100%'}} showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item
            name="distance"
            label="Distance"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item>
            <Button className='btn-submit' type="primary" htmlType="submit" loading={loading}>
              Add journey
            </Button>
          </Form.Item>
        </Form>
      </ModalCustom>
      <TableData columns={columns} tableData={tableData.reverse()}/>
      <ToastContainer />
    </div>
  )
}

