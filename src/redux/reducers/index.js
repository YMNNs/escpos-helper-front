import { combineReducers } from 'redux'
import blocks from './blocks'
import title from './title'
import settings from './settings'
import history from './history'

export default combineReducers({ blocks, title, settings, history })
