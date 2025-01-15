import dayjs from "dayjs"
import { OneNewType } from "../../../../store/features/newSlice/types/news-types"
import { DATE_TIME_FORMAT_1 } from "../../../../shared/consts"
import { OneEventType } from "../../../../store/features/eventSlice/types/event-types"

import "./one-item-card.scss"

type PropsType = {
    item: OneNewType | OneEventType
}

export const OneItemCard = (props: PropsType) => {

    return (
        <div className="one-item-container">
            <img alt="" src={props.item.photo} />
            <div>
                {dayjs(props.item.date).format(DATE_TIME_FORMAT_1)}
            </div>
            <div>
                <strong>{props.item.title}</strong>
            </div>
            <div>
                {props.item.description}
            </div>
        </div>
    )
}