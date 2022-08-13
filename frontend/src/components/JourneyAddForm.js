import { AutoComplete, Button, DatePicker, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { addJourneys, getStationAndId } from '../data/fetchData';
import { v4 as uuid } from 'uuid';
import ModalCustom from './ModalCustom';
import moment from 'moment';

const { Option } = AutoComplete; 

export default function JourneyAddForm({visible, setVisible, setStationData,loading}) {
    const [form] = Form.useForm();
    const [listStation, setListStation] = useState([])
    const [resultStation, setResultStation] = useState([])
    const [departureId,setDepartureId] = useState('')
    const [returnId,setReturnId] = useState('')

    useEffect(() => {
        getStationAndId(setListStation)
    },[])
      
    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
    };

    const onFieldsChange = (value) => {
        if (value[0].name[0] === 'departure') {
          if(value[0].value) {
            const optionList = listStation?.filter((station) => station.name.toLowerCase().indexOf(value[0].value) === 0 || station.name.indexOf(value[0].value) === 0)
            const _departureId = optionList?.[0].stationId
            setResultStation(optionList);
            setDepartureId(_departureId)
          }else {
            setResultStation([]);
          }
        } else if(value[0].name[0] === 'return') {
          if(value[0].value) {
            const optionList = listStation?.filter((station) => station.name.toLowerCase().indexOf(value[0].value) === 0 || station.name.indexOf(value[0].value) === 0)
            const _returnId = optionList?.[0].stationId
            setResultStation(optionList);
            setReturnId(_returnId)
          }else {
            setResultStation([]);
          }
        }
    
    }
    const onFinish = (values) => {
        setVisible(false);
        const body = {
          departure: values.departure,
          departureId: departureId,
          departureAt: values.departure_time.format(`YYYY-MM-DDTHH:mm:ss`),
          return: values.return,
          returnId: returnId,
          returnAt: values.return_time.format(`YYYY-MM-DDTHH:mm:ss`),
          distance: values.distance,
          duration:  moment(values.return_time).diff(moment(values.departure_time), 'second'),
          id: uuid()
        }
        setStationData(body)
        addJourneys(body)
        form.resetFields();
      };
  return (
     <ModalCustom
        visible={visible}
        loading={loading}
        handleCancel={handleCancel}
    >
        <Form layout='vertical' form={form} name="control-hooks" onFinish={onFinish} onFieldsChange={onFieldsChange}>
          <Form.Item 
            name="departure"
            label="Departure Station"
            rules={[
              {
                required: true,
                message: 'Departure Station is required'
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
                message: 'Return Station is required'
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
            label="Distance(m)"
            rules={[
              {
                required: true,
                message: 'Distance is required'
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
  )
}
