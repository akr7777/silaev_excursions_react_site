export type AuthCredentialsType = {
    username: string,
    password: string,
}

export type AdminType = {
    login: string | null
}

export type AuthInitContentType = {
    user: AdminType,
    isLoading: boolean,
}

export const authInitialContent: AuthInitContentType = {
    user: { login: null },
    isLoading: false,
}