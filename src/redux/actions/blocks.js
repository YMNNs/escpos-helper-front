import { ADD_BLOCK, DELETE_BLOCK, EDIT_BLOCK, SET_BLOCKS } from '../constant'

export const addBlock = block => ({ type: ADD_BLOCK, data: block })

export const editBlock = block => ({ type: EDIT_BLOCK, data: block })

export const deleteBlock = id => ({ type: DELETE_BLOCK, data: id })

export const setBlocks = blocks => ({ type: SET_BLOCKS, data: blocks })
