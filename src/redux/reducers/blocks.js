import { ADD_BLOCK, DELETE_BLOCK, EDIT_BLOCK, SET_BLOCKS } from '../constant'
import { cloneDeep, remove } from 'lodash-es'

const initState = []

export default (preState = initState, action) => {
  const { type, data } = action

  switch (type) {
    case ADD_BLOCK: {
      return [...preState, data]
    }
    case EDIT_BLOCK: {
      const newState = cloneDeep(preState)
      const index = newState.indexOf(newState.find((i) => i.id === data.id))
      newState[index] = data
      return newState
    }
    case SET_BLOCKS: {
      return data
    }
    case DELETE_BLOCK: {
      console.log('delblock', data)
      return remove(preState, (i) => i.id !== data)
    }
    default:
      return preState
  }
}
