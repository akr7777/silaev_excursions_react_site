import { useNavigate, useParams } from "react-router"
import { SeparateItem } from "../_separate-item/saparate-item"
import { OneNewType } from "../../../store/features/newSlice/types/news-types"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { OneEventType } from "../../../store/features/eventSlice/types/event-types"
import { newsSliceThunks } from "../../../store/features/newSlice/model/news-thunks"
import { PATHS } from "../../../router/router"
import { newsSliceActions } from "../../../store/features/newSlice/model/news-slice"
import { useEffect } from "react"
import { CREATE_NEW_ENTETY } from "../../../shared/consts"
import { Preloader } from "../../../shared/preloader/preloader"
import { AddNewThunkReqType, UpdateNewThunkReqType } from "../../../store/features/newSlice/types/news-thunk-types"

export const SeparateNewPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { newId } = useParams()

    useEffect(() => {
            if (newId && newId !== CREATE_NEW_ENTETY) {
                dispatch(newsSliceThunks.getById( { newId } ))
            }
        }, [])
        
    const isOneNewLoading: boolean = useAppSelector(state => state.newsSlice.isOneNewLoading)
    const currentNew: OneNewType | null = useAppSelector(state => state.newsSlice.currentNew)
    const onSetCurrentItem = (newItem: OneNewType | OneEventType | null) => {
        dispatch(newsSliceActions.setCurrentNew(newItem))
    }
    const onDeleteHandler = (newId: string) => {
        const answer: boolean = window.confirm("Удалить новость?")
        if (answer) {
            dispatch(newsSliceThunks.deleteNew({ newId: newId }))
            navigate(PATHS.news)
        }
    }
    const onCreateNewHandler = (data: AddNewThunkReqType) => {
        dispatch(newsSliceThunks.addNew(data))
        navigate(PATHS.news)
    }
    const onEditNewHandler = (data: UpdateNewThunkReqType) => {
        dispatch(newsSliceThunks.updateNew(data))
        navigate(PATHS.news)
    }

    return (
        <>
        {
            isOneNewLoading
                ? <Preloader />
                : <SeparateItem 
                    currentItem={currentNew} 
                    itemId={newId}  
                    setCurrentItem={(newItem: OneNewType | OneEventType | null) => onSetCurrentItem(newItem)} 
                    onCreateItemBtnClick={(data: AddNewThunkReqType) => onCreateNewHandler(data)}
                    onEditItemBtnClick={(data: UpdateNewThunkReqType) => onEditNewHandler(data)}
                    onDeleteClick={(id: string) => onDeleteHandler(id)}
                />
        }
        </>
        
    )
}