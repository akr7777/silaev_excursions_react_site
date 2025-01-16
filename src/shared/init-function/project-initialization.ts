import { authSliceActions } from "../../store/features/auth/model/auth-slice"
import { AdminType } from "../../store/features/auth/types/auth-types"
import { store } from "../../store/store"
import { LOCAL_STORAGE_ACCESS_TOKEN } from "../consts"

export const recieveUserFromToken = (accessToken: string): AdminType => {
    const decodedTokenPart = JSON.parse(atob(accessToken.split('.')[1]))
    const data: AdminType = {
        login: decodedTokenPart.login,
    }
    return data
}

export const projectInitialization = () => {
    // Инициализация проекта.

    // Смотрим, есть ли access token в localstorage:
    const accessToken: string | null = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)

    if (accessToken) {
        const data: AdminType = recieveUserFromToken(accessToken)
        store.dispatch(authSliceActions.setAdmin(data))
    }

    // Инициализация проекта завершена
}