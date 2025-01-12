import { authSliceActions } from "../../store/features/auth/model/auth-slice"
import { UserType } from "../../store/features/auth/types/auth-types"
import { store } from "../../store/store"
import { LOCAL_STORAGE_ACCESS_TOKEN } from "../consts"

export const recieveUserFromToken = (accessToken: string): UserType => {
    const decodedTokenPart = JSON.parse(atob(accessToken.split('.')[1]))
    const data: UserType = {
        login: decodedTokenPart.login,
    }
    return data
}

export const projectInitialization = () => {
    // Инициализация проекта.

    // Смотрим, есть ли access token в localstorage:
    const accessToken: string | null = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)

    if (accessToken) {
        const data: UserType = recieveUserFromToken(accessToken)
        store.dispatch(authSliceActions.setUser(data))
    }

    // Инициализация проекта завершена
}