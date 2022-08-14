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
    const [departureList, setDepartureList] = useState([])
    const [returnList, setReturnList] = useState([])
    const [departureId,setDepartureId] = useState('')
    const [returnId,setReturnId] = useState('')

    useEffect(() => {
        getStationAndId(setListStation)
    },[])

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setDepartureList([])
        setReturnList([])
    };

    const onFieldsChange = (value) => {
        if (value[0].name[0] === 'departure') {
          if(value[0].value) {
            const optionList = listStation?.filter((station) => station.name.toLowerCase().indexOf(value[0].value) === 0 || station.name.indexOf(value[0].value) === 0)
            const _departureId = optionList?.[0].stationId
            setDepartureList(optionList);
            setDepartureId(_departureId)
          }else {
            setDepartureList([]);
          }
        } else if(value[0].name[0] === 'return') {
          if(value[0].value) {
            const optionList = listStation?.filter((station) => station.name.toLowerCase().indexOf(value[0].value) === 0 || station.name.indexOf(value[0].value) === 0)
            const _returnId = optionList?.[0].stationId
            setReturnList(optionList);
            setReturnId(_returnId)
          }else {
            setReturnList([]);
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
        setDepartureList([])
        setReturnList([])
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
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  const isValid = departureList.some(element => {
                    if (element.name === value) {
                      return true;
                    }
                  
                    return false;
                  });
                  if(isValid) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Station can not be found'));
                }
              })
            ]}
          >
            <AutoComplete>
              {departureList?.map((station, idx) => (
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
                message: 'Departure Station is required'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  const isValid = returnList.some(element => {
                    if (element.name === value) {
                      return true;
                    }
                  
                    return false;
                  });
                  if(isValid) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Station can not be found'));
                }
              })
            ]}
          >
            <AutoComplete>
              {returnList?.map((station, idx) => (
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
                min: 0,
                message: 'Distance is invalid'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  const invalidChars = [
                    "-",
                    "+",
                    "e",
                  ];
                  if(invalidChars.includes(value)) {
                    return Promise.reject(new Error('Distance is invalid'));
                  }
                  return Promise.resolve();
                }
              })
            ]}
          >
            <Input type={'number'}/>
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
