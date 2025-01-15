import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { newsInitContent, NewsSliceType, OneNewType } from "../types/news-types"
import { newsSliceThunks } from "./news-thunks"
import { GetOneNewThunkResType } from "../types/news-thunk-types"

const newsSlice = createSlice({
    name: 'news-slice',
    initialState: newsInitContent as NewsSliceType,
    reducers: {
      setLoading: (state: NewsSliceType, action: PayloadAction<boolean>) => {
        state.isNewsLoading = action.payload
      },
      isOneNewLoading: (state: NewsSliceType, action: PayloadAction<boolean>) => {
        state.isOneNewLoading = action.payload
      },
      setCurrentNew: (state: NewsSliceType, action: PayloadAction<OneNewType | null>) => {
        state.currentNew = action.payload
      },
    },
    extraReducers: builder => (

      builder.addCase(newsSliceThunks.getAll.fulfilled, (state: NewsSliceType, action: PayloadAction<GetOneNewThunkResType[]>) => {
        if (action.payload && action.payload.length > 0) {
          state.news = [...action.payload]
            .sort((a,b) => a.date < b.date ? 1 : -1)
            .map(el => {
              return {...el, photo: el.nPreviewPhoto}
            })
        }
        
      }),

      builder.addCase(newsSliceThunks.getById.fulfilled, (state: NewsSliceType, action: PayloadAction<GetOneNewThunkResType>) => {
        if (action.payload) {
          state.currentNew = {...action.payload, photo: action.payload.nPreviewPhoto }
        }
      })

    )
    
  })

export const newsSliceActions = newsSlice.actions
export const newsSliceReducer = newsSlice.reducer
