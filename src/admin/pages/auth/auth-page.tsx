import { useState } from "react"
import { CustomTextField } from "../../../components/text-field/custom-text-field"
import { CustomButton } from "../../../components/my-button/my-button"

import "./auth.scss"

export const AuthPage = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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
            <CustomButton title={"Войти"} />
        </div>
    )
}