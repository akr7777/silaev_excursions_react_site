
import { GidType } from "./gid-types";

export type UploadAvatarThunk = {
    id: string,
    formData: FormData,
}

export type AddGidThunkReqType = Omit<GidType, "id" | "avatar">  & {file: File | null};
export type UpdateGidThunkReqType = Omit<GidType, "avatar">  & {file: File | null};

// export type GetOneGidThunkResType = {}