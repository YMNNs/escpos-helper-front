import { ADD_HISTORY, CLEAR_HISTORY, DELETE_HISTORY } from '../constant'

export const addHistory = blockList => ({ type: ADD_HISTORY, data: blockList })

export const deleteHistory = id => ({ type: DELETE_HISTORY, data: id })

export const clearHistory = () => ({ type: CLEAR_HISTORY })
