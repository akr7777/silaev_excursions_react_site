import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { eventInitContent, EventSliceType, OneEventType } from "../types/event-types"
import { eventsSliceThunks } from "./event-thunks"
import { GetOneEventThunkResType } from "../types/event-thunk-types"

const eventSlice = createSlice({
    name: 'event-slice',
    initialState: eventInitContent as EventSliceType,
    reducers: {
      setAllEventsLoading: (state: EventSliceType, action: PayloadAction<boolean>) => {
        state.isAllEventsLoading = action.payload
      },
      setIsOneEventLoading: (state: EventSliceType, action: PayloadAction<boolean>) => {
        state.isOneEventLoading = action.payload
      },
      setCurrentEvent: (state: EventSliceType, action: PayloadAction<OneEventType | null>) => {
        state.currentEvent = action.payload
      },
    },

    extraReducers: builder => {

      builder.addCase(eventsSliceThunks.getAll.fulfilled, (state: EventSliceType, action: PayloadAction<GetOneEventThunkResType[]>) => {
        if (action.payload && action.payload.length > 0) {
          state.events = [...action.payload]
            .sort((a,b) => a.date < b.date ? 1 : -1)
            .map(el => {
              return {...el, photo: el.ePreviewPhoto}
            })
        }
        
      }),

      builder.addCase(eventsSliceThunks.getById.fulfilled, (state: EventSliceType, action: PayloadAction<GetOneEventThunkResType>) => {
        if (action.payload) {
          state.currentEvent = {...action.payload, photo: action.payload.ePreviewPhoto }
        }
      })

    }
    
  })

export const eventSliceActions = eventSlice.actions
export const eventSliceReducer = eventSlice.reducer
