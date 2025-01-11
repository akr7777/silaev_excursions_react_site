
export type PropsType = {
    title: string
}

export const CustomButton = (props: PropsType) => {
    return (
        <button>
            {props.title}
        </button>
    )
}