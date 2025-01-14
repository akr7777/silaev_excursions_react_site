import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiErrorMessage } from "../../../../shared/api/error-message"
import { newsSliceActions } from "./news-slice"
import { newsAPI } from "../api/news-api"
import { AddNewThunkReqType, UpdateNewThunkReqType, UploadPhotoThunk } from "../types/news-thunk-types"

export const newsSliceThunks = {
  getAll: createAsyncThunk('news/getAll', async (_, {dispatch}) => {
    try {
      dispatch(newsSliceActions.setLoading(true))
      const res = await newsAPI.getAll()

      dispatch(newsSliceActions.setLoading(false))
      
      return res.data
      
    } catch (err: any) {
      dispatch(newsSliceActions.setLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  getById: createAsyncThunk('news/getById', async ({newId}: {newId: string}, {dispatch}) => {
    try {
      dispatch(newsSliceActions.setLoading(true))
      const res = await newsAPI.getById(newId)

      dispatch(newsSliceActions.setLoading(false))

      return res.data
      
    } catch (err: any) {
      dispatch(newsSliceActions.setLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  addNew: createAsyncThunk('news/addNew', async (data: AddNewThunkReqType, {dispatch}) => {
    try {
      dispatch(newsSliceActions.setLoading(true))
      const res = await newsAPI.addNew(data)

      dispatch(newsSliceActions.setLoading(false))
      

      if (res.data.id && data.file) {
        const formData = new FormData();
        formData.append("file", data.file);
        dispatch(newsSliceThunks.uploadPhoto({id: res.data.id, formData: formData}))
      }
      
      dispatch(newsSliceThunks.getAll())

    } catch (err: any) {
      dispatch(newsSliceActions.setLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  updateNew: createAsyncThunk('news/updateNew', async (data: UpdateNewThunkReqType, {dispatch}) => {
    try {
      dispatch(newsSliceActions.setLoading(true))
      const res = await newsAPI.updateNew(data)

      dispatch(newsSliceActions.setLoading(false))

      if (res.data.id && data.file) {
        const formData = new FormData();
        formData.append("file", data.file);
        dispatch(newsSliceThunks.uploadPhoto({id: res.data.id, formData: formData}))
      }
      
      dispatch(newsSliceThunks.getAll())

    } catch (err: any) {
      dispatch(newsSliceActions.setLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  deleteNew: createAsyncThunk('news/deleteNew', async ({newId}: { newId: string }, {dispatch}) => {
    try {
      dispatch(newsSliceActions.setLoading(true))
      const res = await newsAPI.deleteNew(newId)

      dispatch(newsSliceActions.setLoading(false))
      
      dispatch(newsSliceThunks.getAll())

    } catch (err: any) {
      dispatch(newsSliceActions.setLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  uploadPhoto: createAsyncThunk('news/uploadPhoto', async (data: UploadPhotoThunk, {dispatch}) => {
    try {
      dispatch(newsSliceActions.setLoading(true))
      const res = await newsAPI.uploadPhoto(data)

      dispatch(newsSliceActions.setLoading(false))
      
    } catch (err: any) {
      dispatch(newsSliceActions.setLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  })
}
