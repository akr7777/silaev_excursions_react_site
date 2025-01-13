import { v4 } from "uuid"
import { Preloader } from "../../../shared/preloader/preloader"
import { useAppSelector } from "../../../store/store"
import { useNavigate } from "react-router"
import { PATHS } from "../../../router/router"
import { CustomButton } from "../../../components/my-button/my-button"
import { CREATE_NEW_ENTETY } from "../../../shared/consts"
import { OneEventType } from "../../../store/features/eventSlice/types/event-types"
import { OneAdminEventList } from "./one-event-card/one-admin-event-card"

import "./admin-events.scss"

export const AdminEvents = () => {
    const navigate = useNavigate()

    const events: Array<OneEventType> = useAppSelector(state => state.eventSlice.events)
    const isEventsLoading: boolean = useAppSelector(state => state.eventSlice.isEventLoading)

    const onEventClick = (id: string) => navigate(PATHS.admin.events + id)
    const onCreateEventClick = () => navigate(PATHS.admin.events + CREATE_NEW_ENTETY)

    return (
        <div className="admin-events-wrapper">
            <h3>Мероприятия:</h3>

            <CustomButton title={"Создать мероприятие"} onPress={onCreateEventClick} class="admin-events-create-btn" />

            {isEventsLoading ? <Preloader /> : (
                <>
                    {events.length > 0 && events
                        // .sort((a:OneNewType, b:OneNewType) => a.date < b.date ? -1 : 1)
                        .map(n => {
                            return <div key={v4()} onClick={() => onEventClick(n.id)}>
                                <OneAdminEventList oneEvent={n} />
                            </div>
                             
                        })}
                </>
            )}

        </div>
    )
}