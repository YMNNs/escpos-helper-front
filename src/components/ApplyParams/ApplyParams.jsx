import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { updateSettings } from '../../redux/actions/settings'
import { Dialog } from 'antd-mobile'

const ApplyParams = (props) => {
  const [search] = useSearchParams()
  const printerUrl = search.get('p')
  const serverUrl = search.get('s')
  const navigate = useNavigate()

  useEffect(() => {
    if (printerUrl && serverUrl) {
      props.updateSettings({ printerUrl, serverUrl })
      Dialog.alert({
        content: '已为您自动设置打印机和服务器，您可以在“设置”中查看详情。'
      })
    }
    navigate('/blocks', { replace: true })
  }, [])

  return (
    <>
      <div/>
    </>
  )
}

export default connect(
  state => ({}), // 映射状态
  { updateSettings }// 映射操作状态的方法
)(ApplyParams)
