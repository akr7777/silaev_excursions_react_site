import { AxiosResponse } from "axios"
import { AuthLoginThunkRequestType } from "../types/auth-thunk-types"
import { instance } from "../../../../shared/api/instance"

export const authAPI = {
    postLogin: (data: AuthLoginThunkRequestType): Promise<AxiosResponse> => {
      return instance.post('auth/login', data)
    },
    // refreshToken: (refresh_token: string): Promise<AxiosResponse> => {
    //   return instance.post('auth/refresh_token', { refresh_token: refresh_token })
    // },
  }