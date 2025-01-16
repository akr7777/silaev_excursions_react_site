import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authSliceReducer } from './features/auth/model/auth-slice'
import { newsSliceReducer } from './features/newSlice/model/news-slice'
import { eventSliceReducer } from './features/eventSlice/model/event-slice'
import { gidSliceReducer } from './features/gidSlice/model/gid-slice'


export const store = configureStore({
  reducer: {
    authSlice: authSliceReducer,
    newsSlice: newsSliceReducer,
    eventSlice: eventSliceReducer,
    gidSlice: gidSliceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
type DispatchFunc = () => AppDispatchType
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type ThunkDispatchType = ThunkDispatch<RootState, any, AnyAction>;

