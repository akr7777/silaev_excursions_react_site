import { OneNewType } from "../../../store/features/newSlice/types/news-types"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { PATHS } from "../../../router/router"
import { useEffect } from "react"
import { Items } from "../_items/items"
import { Preloader } from "../../../shared/preloader/preloader"
import { eventsSliceThunks } from "../../../store/features/eventSlice/model/event-thunks"

export const AdminEventsPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(eventsSliceThunks.getAll())
    }, [])

    const events: Array<OneNewType> = useAppSelector(state => state.eventSlice.events)
    const isEventsLoading: boolean = useAppSelector(state => state.eventSlice.isAllEventsLoading)

    return (
        <>
        {
            isEventsLoading 
                ? <Preloader />
                : <Items 
                    title={"Мероприятия:"} 
                    items={events} 
                    createBtnTitle={"Создать мероприятие"}
                    baseLinkUrl={PATHS.events} 
                />
        }
        </>        
    )
}