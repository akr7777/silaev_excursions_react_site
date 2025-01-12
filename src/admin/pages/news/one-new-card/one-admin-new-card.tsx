import dayjs from "dayjs"
import { OneNewType } from "../../../../store/features/newSlice/types/news-types"
import { DATE_TIME_FORMAT_1 } from "../../../../shared/consts"

import "./one-admin-new-card.scss"

type PropsType = {
    oneNew: OneNewType
}

export const OneAdminNewList = (props: PropsType) => {

    return (
        <div className="one-admin-new-list-container">
            <img alt="" src={props.oneNew.photo} />
            <div>
                {dayjs(props.oneNew.date).format(DATE_TIME_FORMAT_1)}
            </div>
            <div>
                <strong>{props.oneNew.title}</strong>
            </div>
            <div>
                {props.oneNew.description}
            </div>
        </div>
    )
}