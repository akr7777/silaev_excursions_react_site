type GidApiErrorCodesContentType = {
    status: number,
    message: string,
}

export type GidApiErrorCodesType = {
    incorrectCredentials: GidApiErrorCodesContentType
}

export const gidApiErrorCodes = {
    incorrectCredentials: {
        status: 411,
        message: 'Ошибка',
    }
}
