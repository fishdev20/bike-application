import React from 'react'
import { Button, Modal } from 'antd'
import '../App.scss'

export default function ModalCustom(props) {

  const {visible, loading, handleCancel, handleOk, children} = props
  return (
    <Modal
        className='modal'
        visible={visible}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button className='btn-submit' key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        {children}

    </Modal>
  )
}
