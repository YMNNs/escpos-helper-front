import { UPDATE_TITLE } from '../constant'

const initState = 'xx'

export default (preState = initState, action) => {
  const { type, data } = action

  switch (type) {
    case UPDATE_TITLE: {
      return data
    }
    default:
      return preState
  }
}
