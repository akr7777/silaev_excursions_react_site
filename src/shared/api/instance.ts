import axios, { AxiosError } from 'axios'
import { LOCAL_STORAGE_ACCESS_TOKEN } from '../consts'
import { PATHS } from '../../router/router'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL as string,
  withCredentials: true,
})

instance.interceptors.request.use(config => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)}`
  }
//   store.dispatch(appActions.setLoading(true))

  return config
})

export type ResponseType<T> = {
  payloads: T
  status: string
}

export type ResponseErrorType = {
  message: string
  status: string
}

instance.interceptors.response.use(
  config => {
    // store.dispatch(appActions.setLoading(false))

    return config
  },
  async (error: AxiosError<ResponseErrorType>) => {
    if (error.response?.data.message === 'Refresh token has expired') {
    //   store.dispatch(appActions.setLoading(false))

      return
    } else if (error.response?.status === 403) {
      try {
        // const refresh_token = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
        // const res = await authAPI.refreshToken(refresh_token!)
        // const access_token = res.data.accessToken

        // localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, access_token)

        // const originalRequest = error.config

        // originalRequest!.headers.Authorization = `${access_token}`

        //-------------
        // store.dispatch(appActions.setLoading(false))

        // return instance(originalRequest!)
      } catch (error) {
        return Promise.reject(error)
      }
    } else if (error.response?.status === 400) {
      window.location.href = PATHS.auth
    }
    // store.dispatch(appActions.setLoading(false))

    return Promise.reject(error)
  }
)
