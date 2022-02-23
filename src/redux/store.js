import { createStore } from 'redux'

// redux开发者工具
import { composeWithDevTools } from '@redux-devtools/extension'

import reducers from './reducers'

export default createStore(reducers, composeWithDevTools())
