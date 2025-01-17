import { useNavigate, useParams } from "react-router"
import { SeparateItem } from "../_separate-item/saparate-item"
import { OneNewType } from "../../../store/features/newSlice/types/news-types"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { OneEventType } from "../../../store/features/eventSlice/types/event-types"
import { PATHS } from "../../../router/router"
import { useEffect } from "react"
import { CREATE_NEW_ENTETY } from "../../../shared/consts"
import { Preloader } from "../../../shared/preloader/preloader"
import { AddNewThunkReqType, UpdateNewThunkReqType } from "../../../store/features/newSlice/types/news-thunk-types"
import { eventsSliceThunks } from "../../../store/features/eventSlice/model/event-thunks"
import { eventSliceActions } from "../../../store/features/eventSlice/model/event-slice"

export const SeparateEventPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { eventId } = useParams()

    useEffect(() => {
            if (eventId && eventId !== CREATE_NEW_ENTETY) {
                dispatch(eventsSliceThunks.getById( { eventId } ))
            }
        }, [])
        
    const isOneEventLoading: boolean = useAppSelector(state => state.eventSlice.isOneEventLoading)
    const currentEvent: OneNewType | null = useAppSelector(state => state.eventSlice.currentEvent)
    const onSetCurrentItem = (newItem: OneNewType | OneEventType | null) => {
        dispatch(eventSliceActions.setCurrentEvent(newItem))
    }
    const onDeleteHandler = (newId: string) => {
        const answer: boolean = window.confirm("Удалить мероприятие?")
        if (answer) {
            dispatch(eventsSliceThunks.deleteNew({ newId: newId }))
            navigate(PATHS.events)
        }
    }
    const onCreateNewHandler = (data: AddNewThunkReqType) => {
        dispatch(eventsSliceThunks.addNew(data))
        navigate(PATHS.events)
    }
    const onEditNewHandler = (data: UpdateNewThunkReqType) => {
        dispatch(eventsSliceThunks.updateNew(data))
        navigate(PATHS.events)
    }

    const onImageSaveHandler = (file: File | null) => {
            if (eventId && file) {
                const formData = new FormData();
                formData.append("file", file);
                dispatch(eventsSliceThunks.uploadPhoto({id: eventId, formData: formData}))
            }
        }

    return (
        <>
        {
            isOneEventLoading
                ? <Preloader />
                : <SeparateItem 
                        currentItem={currentEvent}
                        itemId={eventId}
                        setCurrentItem={(newItem: OneNewType | OneEventType | null) => onSetCurrentItem(newItem)}
                        onCreateItemBtnClick={(data: AddNewThunkReqType) => onCreateNewHandler(data)}
                        onEditItemBtnClick={(data: UpdateNewThunkReqType) => onEditNewHandler(data)}
                        onDeleteClick={(id: string) => onDeleteHandler(id)} 
                        onImageSaveFunction={(file: File | null) => onImageSaveHandler(file)}
                />
        }
        </>
        
    )
}