export type AuthCredentialsType = {
    username: string,
    password: string,
}

export type UserType = {
    login: string | null
}

export type AuthInitContentType = {
    user: UserType,
    isLoading: boolean,
}

export const authInitialContent: AuthInitContentType = {
    user: { login: "user__name" },
    isLoading: false,
}