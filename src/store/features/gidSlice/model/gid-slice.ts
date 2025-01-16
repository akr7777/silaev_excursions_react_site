import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GidSliceType, GidType, gidSliceInitContent } from "../types/gid-types"
import { gidSliceThunks } from "./gid-thunks"

const gidSlice = createSlice({
    name: 'gid-slice',
    initialState: gidSliceInitContent as GidSliceType,
    reducers: {
      setAllGidsLoading: (state: GidSliceType, action: PayloadAction<boolean>) => {
        state.isAllLoading = action.payload
      },
      setIsOneGidLoading: (state: GidSliceType, action: PayloadAction<boolean>) => {
        state.isOneLoading = action.payload
      },
      setCurrentGid: (state: GidSliceType, action: PayloadAction<GidType | null>) => {
        state.currentGid = action.payload
      },
    },


    extraReducers: builder => {
    
      builder.addCase(gidSliceThunks.getAll.fulfilled, (state: GidSliceType, action: PayloadAction<GidType[]>) => {
        if (action.payload && action.payload.length > 0) {
          state.gids = action.payload
        }
      })

      builder.addCase(gidSliceThunks.getById.fulfilled, (state: GidSliceType, action: PayloadAction<GidType>) => {
        if (action.payload) {
          state.currentGid = action.payload
        }
      })

    }

  })

export const gidSliceActions = gidSlice.actions
export const gidSliceReducer = gidSlice.reducer
