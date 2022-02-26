import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ActionSheet, Button, Dialog, NavBar, Space, Toast, Popover } from 'antd-mobile'
import {
  AddOutline,
  DeleteOutline,
  MoreOutline,
  ExclamationOutline,
  DownlandOutline,
  SetOutline, ClockCircleOutline
} from 'antd-mobile-icons'
import { connect, useStore } from 'react-redux'
import { addHistory, clearHistory } from '../../redux/actions/history'
// eslint-disable-next-line no-unused-vars
import { print } from '../../api/post/print'
import { setBlocks } from '../../redux/actions/blocks'

const Nav = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const store = useStore()
  const actions = [
    {
      text: '打印',
      key: 'print',
      icon: <DownlandOutline />,
      disabled: props.blocks.length === 0,
      onClick: () => {
        if (!store.getState().settings.printerUrl || !store.getState().settings.serverUrl) {
          Toast.show({
            icon: <ExclamationOutline />,
            content: '请先完成设置'
          })
          navigate('/settings')
          return
        }

        print(props.blocks).then((response) => {
          setVisible(false)
          if (response.data.status === 'ok') {
            Toast.show({
              icon: 'success',
              content: '已打印'
            })
          } else {
            Toast.show({
              icon: 'fail',
              content: '打印失败，请检查配置'
            })
          }
        }, (err) => {
          Toast.show({
            icon: 'fail',
            content: err.message
          })
        })
        props.addHistory(props.blocks)
        if (store.getState().settings.clearAfterPrint) {
          props.setBlocks([])
        }
      }
    },
    {
      text: '历史记录',
      key: 'history',
      icon: <ClockCircleOutline />,
      onClick: () => {
        navigate('/history')
      }
    },
    {
      text: '设置',
      key: 'settings',
      icon: <SetOutline />,
      onClick: () => {
        navigate('/settings')
      }
    }
  ]

  const rightActions = () => {
    if (location.pathname === '/' || location.pathname === '/blocks') {
      return <div style={{ fontSize: 24 }} >
        <Space style={{ '--gap': '16px' }}>
          <Popover.Menu
            actions={actions}
            placement='topLeft'
            trigger='click'
          >
          <Button><MoreOutline /></Button>
          </Popover.Menu>
          <Button onClick={() => { navigate('/blocks/new') }}><AddOutline /></Button>
        </Space>
      </div>
    } else if (location.pathname === '/history') {
      return <div style={{ fontSize: 24 }} >
        <Space style={{ '--gap': '16px' }}>
          <Button
            disabled={props.history.length === 0}
            onClick={
              async () => {
                const result = await Dialog.confirm({
                  content: '历史记录删除后将不可恢复'
                })
                if (result) {
                  props.clearHistory()
                }
              }
             }><DeleteOutline /></Button>
        </Space>
      </div>
    } else {
      return null
    }
  }

  return (
    <>
      <NavBar
        right={rightActions()}
        onBack={() => {
          navigate(-1) // 可传数字
        }} back={location.pathname === '/' || location.pathname === '/blocks' ? null : ''}>{props.title}</NavBar>
      <ActionSheet
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
      />
    </>
  )
}

export default connect(
  state => ({
    title: state.title,
    blocks: state.blocks,
    settings: state.settings,
    history: state.history
  }), // 映射状态
  { addHistory, setBlocks, clearHistory }// 映射操作状态的方法
)(Nav)
