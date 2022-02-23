import axios from './index'
import store from '../../redux/store'

export const print = (blocks) => {
  const { serverUrl, printerUrl } = store.getState().settings
  return axios.post(`${serverUrl}/print`, {
    printerUrl,
    blocks
  })
}

export const exportQR = (serverUrl, printerUrl) => {
  const origin = window.location.origin
  return axios.post(`${serverUrl}/print/outputSettingsQRCode`, {
    serverUrl,
    printerUrl,
    origin
  })
}
