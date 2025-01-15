import { v4 } from "uuid"
import { Preloader } from "../../../shared/preloader/preloader"
import { OneNewType } from "../../../store/features/newSlice/types/news-types"
import { useNavigate } from "react-router"
import { CustomButton } from "../../../components/my-button/my-button"
import { CREATE_NEW_ENTETY } from "../../../shared/consts"
import { OneEventType } from "../../../store/features/eventSlice/types/event-types"
import { OneItemCard } from "./one-new-card/one-item-card"

import "./items.scss"

type ItemsPropsType = {
    title: string,
    createBtnTitle: string
    items: OneNewType[] | OneEventType[],
    baseLinkUrl: string
}

export const Items = (props: ItemsPropsType) => {
    const navigate = useNavigate()
    
    const onNewClick = (id: string) => navigate(props.baseLinkUrl + id)
    const onCreateNewClick = () => navigate(props.baseLinkUrl + CREATE_NEW_ENTETY)

    return (
        <div className="items-wrapper">
            <h3>{props.title}</h3>

            <CustomButton title={props.createBtnTitle} onPress={onCreateNewClick} class="items-create-btn" />
                {props.items.length > 0 && props.items
                    // .sort((a:OneNewType, b:OneNewType) => a.date < b.date ? -1 : 1)
                    .map(n => {
                        return <div key={v4()} onClick={() => onNewClick(n.id)}>
                            <OneItemCard item={n} />
                        </div>
                            
                    })}
        </div>
    )
}