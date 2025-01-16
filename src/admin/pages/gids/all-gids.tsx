import { v4 } from "uuid"
import { useNavigate } from "react-router"
import { CustomButton } from "../../../components/my-button/my-button"
import { CREATE_NEW_ENTETY } from "../../../shared/consts"
import { GidType } from "../../../store/features/gidSlice/types/gid-types"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { Preloader } from "../../../shared/preloader/preloader"
import { OneGidCard } from "./gid-card/one-gid-card"
import { PATHS } from "../../../router/router"
import { useEffect } from "react"
import { gidSliceThunks } from "../../../store/features/gidSlice/model/gid-thunks"

import "./gids.scss"

export const GidsPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const gids: GidType[] = useAppSelector(state => state.gidSlice.gids)
    const isLoading: boolean = useAppSelector(state => state.gidSlice.isAllLoading)

    const onNewClick = (id: string) => navigate(PATHS.admin.gids + id)
    const onCreateNewClick = () => navigate(PATHS.admin.gids + CREATE_NEW_ENTETY)

    useEffect(() => {
        dispatch(gidSliceThunks.getAll())
    }, [])

    return (
        <div className="items-wrapper">
            <h3>Экскурсоводы:</h3>

            {
                isLoading ? <Preloader /> : (<>
                    <CustomButton title={"Создать нового экскурсовода"} onPress={onCreateNewClick} class="gids-create-btn" />
                    {gids.length > 0 && gids
                        // .sort((a:OneNewType, b:OneNewType) => a.date < b.date ? -1 : 1)
                        .map(g => {
                            return <div key={v4()} onClick={() => onNewClick(g.id)}>
                                <OneGidCard oneGid={g} />
                            </div>
                                
                        })}
                </>)
            }

                
        </div>
    )
}