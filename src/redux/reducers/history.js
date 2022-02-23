import { ADD_HISTORY, CLEAR_HISTORY, DELETE_HISTORY } from '../constant'
import { remove } from 'lodash-es'
import { nanoid } from 'nanoid'

const initState = JSON.parse(localStorage.getItem('history')) || []

export default (preState = initState, action) => {
  const { type, data } = action

  switch (type) {
    case ADD_HISTORY: {
      const newState = [{ data, time: new Date().toString(), id: nanoid() }, ...preState]
      localStorage.setItem('history', JSON.stringify(newState))
      return newState
    }
    case DELETE_HISTORY: {
      const newState = remove(preState, (i) => i.id !== data)
      localStorage.setItem('history', JSON.stringify(newState))
      return newState
    }
    case CLEAR_HISTORY: {
      const newState = []
      localStorage.setItem('history', JSON.stringify(newState))
      return newState
    }
    default:
      return preState
  }
}
