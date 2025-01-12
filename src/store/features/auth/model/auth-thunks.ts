import { createAsyncThunk } from "@reduxjs/toolkit"
import { authAPI } from "../api/auth-api"
import { AuthApiErrorCodes } from "../api/auth-api-error-codes"
import { AuthLoginThunkRequestType } from "../types/auth-thunk-types"
import { authSliceActions } from "./auth-slice"
import { apiErrorMessage } from "../../../../shared/api/error-message"
import { LOCAL_STORAGE_ACCESS_TOKEN } from "../../../../shared/consts"
import { projectInitialization } from "../../../../shared/init-function/project-initialization"

export const authSliceThunks = {
  loginThunk: createAsyncThunk('auth/loginThunk', async (data: AuthLoginThunkRequestType, {dispatch}) => {
    try {
      dispatch(authSliceActions.setLoading(true))
      const res = await authAPI.postLogin(data)

      dispatch(authSliceActions.setLoading(false))
      
      // return res.data
      const accessToken = res.data.accessToken
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, accessToken)
      projectInitialization()
      
    } catch (err: any) {
      dispatch(authSliceActions.setLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message

      if (err.response.status === AuthApiErrorCodes.incorrectCredentials.status) {
        apiErrorMessage({
          status: AuthApiErrorCodes.incorrectCredentials.status, 
          message: AuthApiErrorCodes.incorrectCredentials.message
        })
      } else {
        apiErrorMessage({ status, message })
      }
    }
  })
}
