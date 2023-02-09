import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import * as queryString from 'querystring'

const axiosClient: AxiosInstance = Axios.create({
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
  },
  paramsSerializer: (param) => queryString.stringify(param),
})
axiosClient.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    return {
      ...config,
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)
axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    return Promise.reject(
      error.response
        ? {
            ...error.response,
          }
        : {
            status: 0,
            data: undefined,
          }
    )
  }
)

export default axiosClient
