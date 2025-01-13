import clsx from "clsx"
import "./text-field.scss"
import { ChangeEvent } from "react"

type PropsType = {
    value: string,
    onChange: (newValue: string) => void,
    additionalClass?: string
    placeholder?: string
    isSecretText?: boolean
}

export const CustomTextField = (props: PropsType) => {

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value)
    }

    return (
        <input
            className={clsx("custom-text-field", props.additionalClass && props.additionalClass)}
            value={props.value}
            onChange={(e) => onValueChange(e)}
            placeholder={props.placeholder ? props.placeholder : ""}
            type={!props.isSecretText ? "text" : "password"}
        />
    )
}