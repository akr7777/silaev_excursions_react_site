import { ChangeEvent } from "react"
import "./text-area.scss"

type PropsType = {
    rows?: number,
    value: string,
    onChange: (newValue: string) => void
}
export const CustomTextArea = (props: PropsType) => {

    const onValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange(e.currentTarget.value)
    }

    return (
        <textarea 
            className="custom-text-area"
            rows={props.rows || 7}
            value={props.value}
            onChange={e => onValueChange(e)}
        />
    )
}