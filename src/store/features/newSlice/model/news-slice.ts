import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { newsInitContent, NewsSliceType } from "../types/news-types"

const newsSlice = createSlice({
    name: 'news-slice',
    initialState: newsInitContent as NewsSliceType,
    reducers: {
      setLoading: (state: NewsSliceType, action: PayloadAction<boolean>) => {
        state.isNewsLoading = action.payload
      },
      
    },
    
  })

export const newsSliceActions = newsSlice.actions
export const newsSliceReducer = newsSlice.reducer
