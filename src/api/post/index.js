import axios from 'axios'

// 创建axios实例
const instance = axios.create({ timeout: 1000 * 20 })
// 设置post请求头,utf-8
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

export default instance
