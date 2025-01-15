import { AxiosResponse } from "axios"
import { instance } from "../../../../shared/api/instance"
import { AddEventApiReqType, UpdateEventThunkReqType } from "../types/event-thunk-types"

const addUrl = "events"

export const eventsAPI = {
    getAll: (): Promise<AxiosResponse> => {
      return instance.get(addUrl)
    },
    getById: (id: string): Promise<AxiosResponse> => {
      return instance.get(addUrl + '/' + id)
    },
    addNew: (data: AddEventApiReqType): Promise<AxiosResponse> => {
      return instance.post(addUrl, data)
    },
    updateNew: (data: UpdateEventThunkReqType): Promise<AxiosResponse> => {
      return instance.put(addUrl + '/' + data.id, data)
    },
    deleteNew: (id: string): Promise<AxiosResponse> => {
      return instance.delete(addUrl + '/' + id)
    },
    uploadPhoto: ({id, formData} : {id: string, formData: FormData}): Promise<AxiosResponse> => {
      return instance.post(addUrl + '/' + id + '/upload-photo', formData)
    },
  }