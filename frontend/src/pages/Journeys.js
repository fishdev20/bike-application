/* eslint-disable default-case */
import React, { useEffect, useRef, useState } from 'react';
import { useGlobal } from 'reactn';
import { fetchJourneys } from '../data/fetchData';
import TableData from '../components/TableData';
import '../styles/stations.scss'
import { Button, Col, Input, Row, Space} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import JourneyAddForm from '../components/JourneyAddForm';
import MiniTable from '../components/MiniTable';

export default function Journeys() {
    const [journeys, setJourneys] = useGlobal('journeys');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [stationData,setStationData] = useState({})
    const searchInput = useRef(null);


    useEffect(() => {
      setLoading(true);
      fetchData();
    },[stationData])

    const fetchData = async () => {
      const fetchedJourneys = await  fetchJourneys()
      setLoading(false);
      setJourneys(fetchedJourneys)
    }

    const topFiveStation = (key) => {
      let obj
      switch(key){
        case 'departureStationName' :
          obj = journeys.reduce((x,y)=>{
            if(x[y.departureStationName]) {
                x[y.departureStationName]++;
                return x;
            } else {
                let z={};
                z[y.departureStationName]=1;
                return Object.assign(x,z);
            }
          },{})
          break;
        case 'returnStationName' : 
          obj = journeys.reduce((x,y)=>{
            if(x[y.returnStationName]) {
                x[y.returnStationName]++;
                return x;
            } else {
                let z={};
                z[y.returnStationName]=1;
                return Object.assign(x,z);
            }
          },{})
          break;
      }
      const sort = Object.entries(obj).map(value => value)
      const arr = sort.map(e => ({ name: e[0], amount: e[1] }))
      const result = arr.sort((a,b) => {return a.amount - b.amount})
      const topFive = result.slice(Math.max(arr.length - 5,0)).map((station,idx) => ({
        key: idx + 1,
        name: station.name,
        amount: station.amount
      }))
      return topFive;
    }

    const showModal = () => {
      setVisible(true);
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
              onClick={() => {
                clearFilters && handleReset(clearFilters) 
                handleSearch(selectedKeys, confirm, dataIndex)}}
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
        sorter: (a, b) =>  moment(b.departureAt) - moment(a.departureAt),
      },
      {
        title: 'Return station',
        dataIndex: 'returnStationName',
        ...getColumnSearchProps('returnStationName', 'station')
      },
      {
        title: 'Return time',
        dataIndex: 'returnAt',
        sorter: (a, b) =>  moment(b.returnAt) - moment(a.returnAt),
      },
      {
        title: 'Distance (km)',
        dataIndex: 'distance',
      },
      {
        title: 'Duration (minutes)',
        dataIndex: 'duration',
        sorter: (a, b) => b.duration - a.duration
      }
    ];
    const tableData = journeys.reverse().map((journey,index) => ({
      key: index,
      journeys: index + 1,
      departureStationName: journey.departureStationName,
      departureAt: moment(journey.departureAt).format('YYYY/MM/DD HH:m:s'),
      returnStationName: journey.returnStationName,
      returnAt: moment(journey.returnAt).format('YYYY/MM/DD HH:m:s'),
      distance:journey.distance / 1000,
      duration: (journey.duration / 60).toFixed(2),
    }))

  
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
        <JourneyAddForm
          visible={visible}
          setVisible={setVisible}
          stationData={stationData}
          setStationData={setStationData}
          loading={loading}
        />
      <TableData 
        loading={loading}
        columns={columns} 
        tableData={tableData.reverse()}
      />
      {Boolean(journeys.length) && <div className='miniTable-container'>
        <Row style={{rowGap: 50}}>
          <Col md={12} xs={24}>
            <MiniTable 
              title={() => { return <h4> Top 5 departure station </h4>}}
              columns = {[
                {
                  title: 'Name of the Station',
                  dataIndex: 'name',
                },
                {
                  title: 'Amount of journeys',
                  dataIndex: 'amount',
                },
              ]}
              data = {topFiveStation('departureStationName')}
            />
          </Col>
          <Col md={12} xs={24}>
          <MiniTable 
              title={() => { return <h4> Top 5 return station </h4>}}
              columns = {[
                {
                  title: 'Name of the Station',
                  dataIndex: 'name',
                },
                {
                  title: 'Amount of journeys',
                  dataIndex: 'amount',
                },
              ]}
              data = {topFiveStation('returnStationName')}
            />
          </Col>
        </Row>
      </div>}
      
      
    </div>
  )
}

