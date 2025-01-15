import { OneNewType } from "../../../store/features/newSlice/types/news-types"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { PATHS } from "../../../router/router"
import { useEffect } from "react"
import { newsSliceThunks } from "../../../store/features/newSlice/model/news-thunks"
import { Items } from "../_items/items"
import { Preloader } from "../../../shared/preloader/preloader"

export const AdminNewsPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(newsSliceThunks.getAll())
    }, [])

    const news: Array<OneNewType> = useAppSelector(state => state.newsSlice.news)
    const isNewsLoading: boolean = useAppSelector(state => state.newsSlice.isNewsLoading)

    return (
        <>
        {
            isNewsLoading 
                ? <Preloader />
                : <Items 
                    title={"Новости:"} 
                    items={news} 
                    createBtnTitle={"Создать новость"}
                    baseLinkUrl={PATHS.admin.news} 
                />
        }
        </>        
    )
}