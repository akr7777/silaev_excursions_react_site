import { AxiosResponse } from "axios"
import { instance } from "../../../../shared/api/instance"
import { AddGidThunkReqType, UpdateGidThunkReqType } from "../types/gid-thunk-types"

const addUrl = "users"

export const gidsAPI = {
    getAll: (): Promise<AxiosResponse> => {
      return instance.get(addUrl)
    },
    getById: (id: string): Promise<AxiosResponse> => {
      return instance.get(addUrl + '/' + id)
    },
    add: (data: AddGidThunkReqType): Promise<AxiosResponse> => {
      return instance.post(addUrl, data)
    },
    update: (data: UpdateGidThunkReqType): Promise<AxiosResponse> => {
      return instance.put(addUrl + '/' + data.id, data)
    },
    delete: (id: string): Promise<AxiosResponse> => {
      return instance.delete(addUrl + '/' + id)
    },
    uploadPhoto: ({id, formData} : {id: string, formData: FormData}): Promise<AxiosResponse> => {
      return instance.post(addUrl + '/' + id + '/upload-avatar', formData)
    },
  }