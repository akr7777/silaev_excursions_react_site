export type OneEventType = {
    id: string,
    date: string,
    title: string,
    description: string,
    additionalInfo?: string,
    link?: string,
    photo?: string
}

export type EventSliceType = {
    isAllEventsLoading: boolean,
    isOneEventLoading: boolean,
    currentEvent: OneEventType | null,
    events: Array<OneEventType>,
}



export const eventInitContent: EventSliceType = {
    isAllEventsLoading: false,
    isOneEventLoading: false,
    currentEvent: null,
    events: [],
}