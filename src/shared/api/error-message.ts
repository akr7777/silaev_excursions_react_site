import { toast } from "react-toastify"

export type AuthErrorMessageType = {
    status: number,
    message: string,
}

export const apiErrorMessage = (props: AuthErrorMessageType) => {
    toast.error('Код ошибки: ' + props.status + '.\nСообщение: ' + props.message)
}