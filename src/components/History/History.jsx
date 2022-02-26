import React, { useEffect } from 'react'
import { connect, useStore } from 'react-redux'
import { Dialog, Ellipsis, Empty, List, SwipeAction } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { deleteHistory } from '../../redux/actions/history'
import { updateTitle } from '../../redux/actions/title'
import { setBlocks } from '../../redux/actions/blocks'

const History = (props) => {
  const listItems = props.listItems
  const navigate = useNavigate()
  const store = useStore()

  useEffect(() => {
    props.updateTitle('历史记录')
    console.log(listItems)
  }, [])

  return (
    <>
      <List>
        {listItems && listItems.length && listItems.length > 0
          ? listItems.map((item) => {
            return (
              <SwipeAction
                key={item.id}
                rightActions={
                  [
                    {
                      key: 'delete',
                      text: '删除',
                      color: 'danger',
                      onClick: () => { props.deleteHistory(item.id) }

                    }]
                }
              >
                <List.Item onClick={
                  async () => {
                    const result = await Dialog.confirm({
                      content: '将会使用当前的历史记录替换文本列表'
                    })
                    if (result) {
                      props.setBlocks(store.getState().history.find(i => i.id === item.id).data)
                      navigate('/blocks')
                    }
                  }

                }

                >
                  <Ellipsis direction='end' content={item.time} />
                </List.Item>
              </SwipeAction>
            )
          })
          : <Empty description='暂无数据' style={{ padding: '64px 0', height: '78vh' }}
                   imageStyle={{ width: 128 }}/>}
      </List>
    </>
  )
}

export default connect(
  state => ({
    listItems: state.history
  }), // 映射状态
  { deleteHistory, updateTitle, setBlocks }// 映射操作状态的方法
)(History)
