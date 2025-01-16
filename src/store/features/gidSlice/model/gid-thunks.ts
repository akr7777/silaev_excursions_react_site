import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiErrorMessage } from "../../../../shared/api/error-message"
import { toast } from "react-toastify"
import { gidSliceActions } from "./gid-slice"
import { gidsAPI } from "../api/gid-api"
import { AddGidThunkReqType, UpdateGidThunkReqType, UploadAvatarThunk } from "../types/gid-thunk-types"

export const gidSliceThunks = {
  getAll: createAsyncThunk('gid/getAll', async (_, {dispatch}) => {
    try {
      dispatch(gidSliceActions.setAllGidsLoading(true))
      const res = await gidsAPI.getAll()

      dispatch(gidSliceActions.setAllGidsLoading(false))
      
      return res.data
      
    } catch (err: any) {
      dispatch(gidSliceActions.setAllGidsLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  getById: createAsyncThunk('gid/getById', async ({gidId}: {gidId: string}, {dispatch}) => {
    try {
      dispatch(gidSliceActions.setIsOneGidLoading(true))
      const res = await gidsAPI.getById(gidId)

      dispatch(gidSliceActions.setIsOneGidLoading(false))

      return res.data
      
    } catch (err: any) {
      dispatch(gidSliceActions.setIsOneGidLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  add: createAsyncThunk('gid/addNew', async (data: AddGidThunkReqType, {dispatch}) => {
    try {
      dispatch(gidSliceActions.setIsOneGidLoading(true))
      const res = await gidsAPI.add(data)

      dispatch(gidSliceActions.setIsOneGidLoading(false))
      

      if (res.data.id && data.file) {
        const formData = new FormData();
        formData.append("file", data.file);
        dispatch(gidSliceThunks.uploadPhoto({id: res.data.id, formData: formData}))
      }
      
      if (res.data.id) {
        toast.info("Новый экскурсовод успешно добавлен")
        // dispatch(newsSliceThunks.getAll())
      }

    } catch (err: any) {
      dispatch(gidSliceActions.setIsOneGidLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  update: createAsyncThunk('gid/updateGid', async (data: UpdateGidThunkReqType, {dispatch}) => {
    try {
      dispatch(gidSliceActions.setIsOneGidLoading(true))
      const res = await gidsAPI.update(data)

      dispatch(gidSliceActions.setIsOneGidLoading(false))

      if (res.data.id && data.file) {
        const formData = new FormData();
        formData.append("file", data.file);
        dispatch(gidSliceThunks.uploadPhoto({id: res.data.id, formData: formData}))
      }
      
      if (res.data.id) {
        toast.info("Данные успешно отредактированы")
        // dispatch(newsSliceThunks.getAll())
      }

    } catch (err: any) {
      dispatch(gidSliceActions.setIsOneGidLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  delete: createAsyncThunk('gid/deleteNew', async ({gidId}: { gidId: string }, {dispatch}) => {
    try {
      dispatch(gidSliceActions.setIsOneGidLoading(true))
      const res = await gidsAPI.delete(gidId)

      dispatch(gidSliceActions.setIsOneGidLoading(false))
      
      if (res.status === 200) {
        toast.info("Экскурсовод успешно удален")
        dispatch(gidSliceThunks.getAll())
      }
      

    } catch (err: any) {
      dispatch(gidSliceActions.setIsOneGidLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  }),

  uploadPhoto: createAsyncThunk('gid/uploadPhoto', async (data: UploadAvatarThunk, {dispatch}) => {
    try {
      dispatch(gidSliceActions.setIsOneGidLoading(true))

      const res = await gidsAPI.uploadPhoto(data)

      dispatch(gidSliceActions.setIsOneGidLoading(false))


      if (res.status === 201) {
        toast.info("Фото добавлено")
        dispatch(gidSliceThunks.getAll())
      }
      
    } catch (err: any) {
      dispatch(gidSliceActions.setIsOneGidLoading(false))
      const status: number = err.response.status
      const message: string = err.response.data.message
      apiErrorMessage({ status, message })
    }
  })
}
