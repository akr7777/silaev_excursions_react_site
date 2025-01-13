import dayjs from "dayjs"
import { OneNewType } from "../../../../store/features/newSlice/types/news-types"
import { DATE_TIME_FORMAT_1 } from "../../../../shared/consts"

import "./one-admin-event-card.scss"

type PropsType = {
    oneEvent: OneNewType
}

export const OneAdminEventList = (props: PropsType) => {

    return (
        <div className="one-admin-event-list-container">
            <img alt="" src={props.oneEvent.photo} />
            <div>
                {dayjs(props.oneEvent.date).format(DATE_TIME_FORMAT_1)}
            </div>
            <div>
                <strong>{props.oneEvent.title}</strong>
            </div>
            <div>
                {props.oneEvent.description}
            </div>
        </div>
    )
}