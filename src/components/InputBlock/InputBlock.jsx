import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'

import {
  Form,
  Button,
  TextArea,
  Stepper,
  Switch, Selector
} from 'antd-mobile'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addBlock, editBlock } from '../../redux/actions/blocks'
import { nanoid } from 'nanoid'
import { updateTitle } from '../../redux/actions/title'

const InputBlock = (props) => {
  const { id } = useParams() // 字符串
  const { blocks } = props
  const currentBlock = blocks.find((i) => i.id === id) ? blocks.find((i) => i.id === id) : {}
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentBlock.text) {
      props.updateTitle('新建文本')
    } else {
      props.updateTitle('编辑文本')
    }
  }, [])

  const [lf, setLf] = useState(currentBlock.lf !== undefined ? currentBlock.lf : true)
  const [width, setWidth] = useState(currentBlock.width || 1)
  const [height, setHeight] = useState(currentBlock.height || 1)
  const [text, setText] = useState(currentBlock.text || '')
  const [align, setAlign] = useState(currentBlock.align || 1)

  const onFinish = (a) => {
    if (id === 'new') {
      props.addBlock({ lf, width, height, text, align, id: nanoid() })
    } else { props.editBlock({ lf, width, height, text, align, id }) }
    navigate('/blocks')
  }

  return (
    <>
      <Form
        onFinish={onFinish}
        footer={
          <Button block type='submit' color='primary' size='large'>
            完成
          </Button>
        }
      >
        {/* <Form.Header>正在编辑文本</Form.Header> */}
        <Form.Item
          name='text'
          label='文本'
          rules={[{ required: true, message: '文本不能为空' }]}
          initialValue={text}
        >
          <TextArea placeholder='请输入文本' onChange={setText}/>
        </Form.Item>
        <Form.Item name='height' label='高度' help='字体高度 范围1-8' initialValue={height} >
          <Stepper min={1} max={8} onChange={setHeight}/>
        </Form.Item>
        <Form.Item name='width' label='宽度' help='字体宽度 范围1-8' initialValue={width} >
          <Stepper min={1} max={8} onChange={setWidth}/>
        </Form.Item>
        <Form.Item name='lf' label='以换行符结尾' help='开启时下一个文本块将从新的一行开始' >
          <Switch defaultChecked={lf} onChange={setLf}/>
        </Form.Item>
        <Form.Item name="align" label="对齐方式" initialValue={[1]}>
          <Selector
            options={[
              {
                label: '左对齐',
                value: 1
              }, {
                label: '居中对齐',
                value: 2
              }, {
                label: '右对齐',
                value: 3
              }
            ]}
            onChange={(arr, extend) => setAlign(arr[0])}
            value={[align]}
          />
        </Form.Item>

      </Form>
    </>
  )
}

export default connect(
  state => ({
    blocks: state.blocks
  }), // 映射状态
  { addBlock, editBlock, updateTitle }// 映射操作状态的方法
)(InputBlock)
