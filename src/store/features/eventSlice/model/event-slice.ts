import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { eventInitContent, EventSliceType } from "../types/event-types"

const eventSlice = createSlice({
    name: 'event-slice',
    initialState: eventInitContent as EventSliceType,
    reducers: {
      setLoading: (state: EventSliceType, action: PayloadAction<boolean>) => {
        state.isEventLoading = action.payload
      },
      
    },
    
  })

export const eventSliceActions = eventSlice.actions
export const eventSliceReducer = eventSlice.reducer
