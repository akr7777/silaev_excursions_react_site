type NewsApiErrorCodesContentType = {
    status: number,
    message: string,
}

export type NewsApiErrorCodesType = {
    incorrectCredentials: NewsApiErrorCodesContentType
}

export const NewsApiErrorCodes = {
    incorrectCredentials: {
        status: 411,
        message: 'Ошибка',
    }
}
