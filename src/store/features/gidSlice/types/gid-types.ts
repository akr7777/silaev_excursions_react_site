export interface GidType {
    login?: string,
    passwordHash?: string,

    id: string,
    fullName: string,
    description?: string,
    contactInfo?: string,
    avatar?: string,
}

export type GidSliceType = {
    gids: Array<GidType>,
    currentGid: GidType | null,
    isAllLoading: boolean,
    isOneLoading: boolean,
}

export const gidContactFields = {
    phone: "phone",
    email: "email",
    telegram: "telegram",
    // whatsapp: "whatsapp",
    // viber: "vider",
    vk: "vk",
    youtube: "youtube",
    rutube: "rutube",
}
export type OneContactType = {
    filedName: typeof gidContactFields.phone |
        typeof gidContactFields.email |
        typeof gidContactFields.telegram | 
        // typeof gidContactFields.whatsapp |
        // typeof gidContactFields.viber |
        typeof gidContactFields.vk |
        // typeof gidContactFields.facebook |
        typeof gidContactFields.youtube |
        typeof gidContactFields.rutube
    value: string,
}
export type GidContactType = {
    phone?: string,
    email?: string
    telegram?: string
    // whatsapp?: string
    // viber?: string
    vk?: string
    // facebook?: string
    youtube?: string
    rutube?: string
}



export const gidSliceInitContent: GidSliceType = {
    gids: [],
    currentGid: null,
    isAllLoading: false,
    isOneLoading: false,
}
