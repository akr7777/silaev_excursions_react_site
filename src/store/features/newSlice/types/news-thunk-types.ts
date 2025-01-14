import { OneNewType } from "./news-types";

export type GetOneNewThunkResType = Omit<OneNewType, "photo"> & { nPreviewPhoto: string }

export type AddNewThunkReqType = Omit<OneNewType, "id" | "photo"> & {file: File | null};
export type AddNewApiReqType = Omit<OneNewType, "id" | "photo">;

export type UpdateNewThunkReqType = Omit<OneNewType, "photo"> & {file: File | null};

export type UploadPhotoThunk = {
    id: string,
    formData: FormData,
}

// {
//     date: string,
//     title: string,
//     description: string,
//     additionalInfo?: string,
//     link?: string
// }