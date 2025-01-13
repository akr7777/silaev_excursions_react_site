export type OneNewType = {
    id: string,
    date: string,
    title: string,
    description: string,
    additional_info: string,
    link: string,
    photo: string
}

export type NewsSliceType = {
    news: Array<OneNewType>,
    isNewsLoading: boolean
}


export const newsInitContent: NewsSliceType = {
    isNewsLoading: false,
    news: [
        // {
        //     id: "111",
        //     date: "2025-01-08T11:00:00Z",
        //     title: "НОВОСТЬ: Новая экскурсия по Москве",
        //     description: "Краткое описание новости.",
        //     additional_info: "Дополнительная информация о новости",
        //     link: "https://google.com",
        //     photo: "https://sun9-58.userapi.com/impg/xIwffcx_gUwgZtGgttMRFQDzq6zg0p3oGbXkhA/Xk5YlXqg1m4.jpg?size=604x403&quality=95&sign=ee4be97d17cb4965a332e7199b971cff&c_uniq_tag=3J1RqYezYxHeq8ba0tRtCghsRcslcFCIeo0oio4Vf1s&type=album"
        // },
        // {
        //     id: "222",
        //     date: "2025-01-09T12:00:00Z",
        //     title: "НОВОСТЬ: Новая экскурсия по Москве",
        //     description: "Краткое описание новости.",
        //     additional_info: "Дополнительная информация о новости",
        //     link: "https://google.com",
        //     photo: "https://www.campingmaniacs.com/assets/img/camper-with-packed-backpacks.webp"
        // }
    ]
}