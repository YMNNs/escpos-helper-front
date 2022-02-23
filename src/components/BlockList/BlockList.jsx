import React, { useEffect } from 'react'
import { Ellipsis, Empty, List, SwipeAction } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { addBlock, deleteBlock } from '../../redux/actions/blocks'
import { connect } from 'react-redux'
import { updateTitle } from '../../redux/actions/title'

const BlockList = (props) => {
  const listItems = props.listItems
  const navigate = useNavigate()

  useEffect(() => {
    props.updateTitle('文本列表')
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
                      onClick: () => {
                        props.deleteBlock(item.id)
                      }
                    }]
                }
              >
                <List.Item onClick={() => {
                  navigate(`/blocks/${item.id}`)
                }}
                >
                  <Ellipsis direction='end' content={item.text}/>
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
    listItems: state.blocks // 这里的state是redux的，listItems是当前组件props
  }),
  { addBlock, deleteBlock, updateTitle }
)(BlockList)
