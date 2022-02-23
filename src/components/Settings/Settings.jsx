import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Space, Toast } from 'antd-mobile'
import { updateTitle } from '../../redux/actions/title'
import { updateSettings } from '../../redux/actions/settings'
import { exportQR } from '../../api/post/print'
import { useNavigate } from 'react-router-dom'

const Settings = (props) => {
  useEffect(() => {
    props.updateTitle('设置')
  }, [])

  const [serverUrl, setServerUrl] = useState(props.settings.serverUrl || '')
  const [printerUrl, setPrinterUrl] = useState(props.settings.printerUrl || '')
  const [form] = Form.useForm() // 表单实例，需要通过Form的form属性绑定
  const navigate = useNavigate

  const doTest = () => {
    form.validateFields().then((res) => {
      exportQR(serverUrl, printerUrl).then(r => {
        Toast.show({
          icon: 'success',
          content: '成功，设置已保存'
        })
        props.updateSettings(res)
      }, err => {
        Toast.show({
          icon: 'fail',
          content: err.message
        })
      })
    }, (err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Form
        form={form}
        onFinish={(res) => {
          props.updateSettings(res)
          Toast.show({
            icon: 'success',
            content: '设置已保存'
          })
          navigate(-1)
        }}
        footer={
          <Space block direction='vertical'>
            <Button block size='large' onClick={doTest}>
              测试并打印配置二维码
            </Button>

            <Button type='submit' block color='primary' size='large'>
              保存
            </Button>
          </Space>
        }
      >
        <Form.Item initialValue={serverUrl} name="serverUrl" label="服务器URL" rules={[{ required: true, message: '服务器URL不能为空' }]}>
          <Input placeholder='http://localhost:8080' onChange={setServerUrl}/>
        </Form.Item>
        <Form.Item initialValue={printerUrl} name="printerUrl" label="打印机URL" rules={[{ required: true, message: '打印机URL不能为空' }]}>
          <Input placeholder='192.168.192.168:9100' onChange={setPrinterUrl}/>
        </Form.Item>
      </Form>
    </>
  )
}

export default connect(
  state => ({
    settings: state.settings
  }), // 映射状态
  { updateTitle, updateSettings }// 映射操作状态的方法
)(Settings)
