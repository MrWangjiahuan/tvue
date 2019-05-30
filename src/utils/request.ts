import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance
} from 'axios'
import { handleException, handleError } from './exception'

// create an axios instance
const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // do something before request is sent

    // if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.headers['X-Token'] = getToken()
    // }
    return config
  },
  (error: AxiosError) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  async (res: AxiosResponse) => {
    if (res.status.toString().charAt(0) !== '2') {
      const result = await handleException(res)
      return result
    }
    return res.data
  },
  (error: AxiosError): void => handleError(error)
)

export default service
