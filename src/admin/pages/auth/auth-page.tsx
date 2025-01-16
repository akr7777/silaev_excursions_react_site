import { useEffect, useState } from "react"
import { CustomTextField } from "../../../components/text-field/custom-text-field"
import { CustomButton } from "../../../components/my-button/my-button"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { authSliceThunks } from "../../../store/features/auth/model/auth-thunks"
import { AuthLoginThunkRequestType } from "../../../store/features/auth/types/auth-thunk-types"
import { toast } from "react-toastify"

import "./auth.scss"
import { useNavigate } from "react-router"
import { PATHS } from "../../../router/router"

export const AuthPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    // Если пользователь уже залогинен, то не показывает эту страницу
    const login: string | null = useAppSelector(state => state.authSlice.user.login)
    const isAuthentificated: boolean = login !== null && login.length > 0
    useEffect(() => {
        if (isAuthentificated) {
            navigate(PATHS.rootPath)
        }
    }, [isAuthentificated])
    

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onLoginClick = () => {
        if (username.length === 0 || password.length === 0) {
            toast.error('Необходимо ввести логин и пароль')
        } else {
            const data: AuthLoginThunkRequestType = {
                login: username, password: password
            }
            dispatch(authSliceThunks.loginThunk(data))
        }
    }

    return (
        <div className="auth-page-wrapper">
            <h2>Авторизация</h2>
            <CustomTextField 
                value={username} 
                onChange={(newValue: string) => setUsername(newValue)}
                placeholder="Логин"
            />
            <CustomTextField 
                value={password} 
                onChange={(newValue: string) => setPassword(newValue)}
                placeholder="Пароль"
                isSecretText={true}
            />
            <CustomButton title={"Войти"} onPress={onLoginClick} tabIndex={0} autoFocus={true}/>
        </div>
    )
}