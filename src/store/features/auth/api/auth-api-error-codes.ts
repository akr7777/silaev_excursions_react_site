type AuthApiErrorCodesContentType = {
    status: number,
    message: string,
}

export type AuthApiErrorCodesType = {
    incorrectCredentials: AuthApiErrorCodesContentType
}

export const AuthApiErrorCodes = {
    incorrectCredentials: {
        status: 400,
        message: 'Неверный логин или пароль',
    }
}
