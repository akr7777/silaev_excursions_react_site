export interface OneNewType {
    id: string,
    date: string,
    title: string,
    description: string,
    additionalInfo?: string,
    link?: string,
    photo?: string
}


export type NewsSliceType = {
    news: Array<OneNewType>,
    currentNew: OneNewType | null,
    isNewsLoading: boolean
    isOneNewLoading: boolean
}


export const newsInitContent: NewsSliceType = {
    isNewsLoading: false, 
    isOneNewLoading: false,
    currentNew: null,
    news: []
}