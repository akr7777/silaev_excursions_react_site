
export type PropsType = {
    title: string
    onPress: () => void
    class?: string
    tabIndex?: number
    isActive?: boolean
    autoFocus?: boolean
}

export const CustomButton = (props: PropsType) => {
    return (
        <button 
            onClick={props.onPress}
            className={props.class ? props.class : ""}
            tabIndex={props.tabIndex}
            autoFocus={props.autoFocus}
        >
            {props.title}
        </button>
    )
}