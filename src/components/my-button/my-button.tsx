
export type PropsType = {
    title: string
    onPress: () => void
    class?: string
}

export const CustomButton = (props: PropsType) => {
    return (
        <button 
            onClick={props.onPress}
            className={props.class ? props.class : ""}
        >
            {props.title}
        </button>
    )
}