import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthInitContentType, authInitialContent, AdminType } from "../types/auth-types"

const authSlice = createSlice({
    name: 'auth-slice',
    initialState: authInitialContent,
    reducers: {
      setLoading: (state: AuthInitContentType, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload
      },
      setUser: (state: AuthInitContentType, action: PayloadAction<AdminType>) => {
          state.user = {...action.payload}
      },
    },
    
  })

export const authSliceActions = authSlice.actions
export const authSliceReducer = authSlice.reducer
