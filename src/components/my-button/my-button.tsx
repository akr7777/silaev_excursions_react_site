
export type PropsType = {
    title: string
    onPress: () => void
}

export const CustomButton = (props: PropsType) => {
    return (
        <button onClick={props.onPress}>
            {props.title}
        </button>
    )
}