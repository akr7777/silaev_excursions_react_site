import { AxiosResponse } from "axios"
import { instance } from "../../../../shared/api/instance"
import { AddNewApiReqType, UpdateNewThunkReqType } from "../types/news-thunk-types"

const addUrl = "news"

export const newsAPI = {
    getAll: (): Promise<AxiosResponse> => {
      return instance.get(addUrl)
    },
    getById: (id: string): Promise<AxiosResponse> => {
      return instance.get(addUrl + '/' + id)
    },
    addNew: (data: AddNewApiReqType): Promise<AxiosResponse> => {
      return instance.post(addUrl, data)
    },
    updateNew: (data: UpdateNewThunkReqType): Promise<AxiosResponse> => {
      return instance.put(addUrl + '/' + data.id, data)
    },
    deleteNew: (id: string): Promise<AxiosResponse> => {
      return instance.delete(addUrl + '/' + id)
    },
    uploadPhoto: ({id, formData} : {id: string, formData: FormData}): Promise<AxiosResponse> => {
      return instance.post(addUrl + '/' + id + '/upload-photo', formData)
    },
  }