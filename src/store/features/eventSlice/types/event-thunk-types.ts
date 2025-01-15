import { OneEventType } from "./event-types";

export type GetOneEventThunkResType = Omit<OneEventType, "photo"> & { ePreviewPhoto: string }

export type AddEventThunkReqType = Omit<OneEventType, "id" | "photo"> & {file: File | null};
export type AddEventApiReqType = Omit<OneEventType, "id" | "photo">;

export type UpdateEventThunkReqType = Omit<OneEventType, "photo"> & {file: File | null};

export type UploadPhotoThunk = {
    id: string,
    formData: FormData,
}
