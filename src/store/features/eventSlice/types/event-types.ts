export type OneEventType = {
    id: string,
    date: string,
    title: string,
    description: string,
    additional_info: string,
    link: string,
    photo: string
}

export type EventSliceType = {
    isEventLoading: boolean,
    events: Array<OneEventType>,
}



export const eventInitContent: EventSliceType = {
    isEventLoading: false,
    events: [],
}