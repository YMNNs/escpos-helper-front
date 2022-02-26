import { UPDATE_SETTINGS } from '../constant'

const initState = JSON.parse(localStorage.getItem('settings')) || { serverUrl: undefined, printerUrl: undefined, clearAfterPrint: true }

export default (preState = initState, action) => {
  const { type, data } = action

  switch (type) {
    case UPDATE_SETTINGS: {
      localStorage.setItem('settings', JSON.stringify(data))
      return data
    }
    default:
      return preState
  }
}
