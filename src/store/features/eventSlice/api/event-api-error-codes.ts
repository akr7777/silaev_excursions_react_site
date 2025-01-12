type EventApiErrorCodesContentType = {
    status: number,
    message: string,
}

export type EventApiErrorCodesType = {
    incorrectCredentials: EventApiErrorCodesContentType
}

export const eventApiErrorCodes = {
    incorrectCredentials: {
        status: 411,
        message: 'Ошибка',
    }
}
