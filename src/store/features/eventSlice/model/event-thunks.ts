import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiErrorMessage } from "../../../../shared/api/error-message"
import { toast } from "react-toastify"
import { eventSliceActions } from "./event-slice"
import { AddEventThunkReqType, UpdateEventThunkReqType, UploadPhotoThunk } from "../types/event-thunk-types"
import { eventsAPI } from "../api/event-api"

export const eventsSliceThunks = {
  getAll: createAsyncThunk('events/getAll', async (_, {dispatch}) => {
    try {
      dispatch(eventSliceActions.setAllEventsLoading(true))
      const res = await eventsAPI.getAll()

      dispatch(eventSliceActions.setAllEventsLoading(false))
      
      return res.data
      
    } catch (err: any) {
      dispatch(eventSliceActions.setAllEventsLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  getById: createAsyncThunk('events/getById', async ({eventId}: {eventId: string}, {dispatch}) => {
    try {
      dispatch(eventSliceActions.setIsOneEventLoading(true))
      const res = await eventsAPI.getById(eventId)

      dispatch(eventSliceActions.setIsOneEventLoading(false))

      return res.data
      
    } catch (err: any) {
      dispatch(eventSliceActions.setIsOneEventLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  addNew: createAsyncThunk('events/addNew', async (data: AddEventThunkReqType, {dispatch}) => {
    try {
      dispatch(eventSliceActions.setAllEventsLoading(true))
      const res = await eventsAPI.addNew(data)

      dispatch(eventSliceActions.setAllEventsLoading(false))
      

      if (res.data.id && data.file) {
        const formData = new FormData();
        formData.append("file", data.file);
        dispatch(eventsSliceThunks.uploadPhoto({id: res.data.id, formData: formData}))
      }
      
      if (res.data.id) {
        toast.info("Мероприятие успешно добавлено")
        // dispatch(newsSliceThunks.getAll())
      }

    } catch (err: any) {
      dispatch(eventSliceActions.setAllEventsLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  updateNew: createAsyncThunk('events/updateNew', async (data: UpdateEventThunkReqType, {dispatch}) => {
    try {
      dispatch(eventSliceActions.setAllEventsLoading(true))
      const res = await eventsAPI.updateNew(data)

      dispatch(eventSliceActions.setAllEventsLoading(false))

      if (res.data.id && data.file) {
        const formData = new FormData();
        formData.append("file", data.file);
        dispatch(eventsSliceThunks.uploadPhoto({id: res.data.id, formData: formData}))
      }
      
      if (res.data.id) {
        toast.info("Мероприятие успешно отредактировано")
        // dispatch(newsSliceThunks.getAll())
      }

    } catch (err: any) {
      dispatch(eventSliceActions.setAllEventsLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  deleteNew: createAsyncThunk('events/deleteNew', async ({newId}: { newId: string }, {dispatch}) => {
    try {
      dispatch(eventSliceActions.setAllEventsLoading(true))

      const res = await eventsAPI.deleteNew(newId)

      dispatch(eventSliceActions.setAllEventsLoading(false))
      
      if (res.status === 200) {
        toast.info("Мероприятие успешно удалено")
        // dispatch(newsSliceThunks.getAll())
      }
      

    } catch (err: any) {
      dispatch(eventSliceActions.setAllEventsLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  uploadPhoto: createAsyncThunk('events/uploadPhoto', async (data: UploadPhotoThunk, {dispatch}) => {
    try {
      dispatch(eventSliceActions.setAllEventsLoading(true))

      const res = await eventsAPI.uploadPhoto(data)

      dispatch(eventSliceActions.setAllEventsLoading(false))


      if (res.status === 201) {
        toast.info("Фото добавлено")
        dispatch(eventsSliceThunks.getAll())
      }
      
    } catch (err: any) {
      dispatch(eventSliceActions.setAllEventsLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  })
}
