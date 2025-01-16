import { GidType } from "../../../../store/features/gidSlice/types/gid-types"

import "./one-gid-card.scss"

type PropsType = {
    oneGid: GidType
}

export const OneGidCard = ({ oneGid }: PropsType) => {

    return (
        <div className="one-gid-container">
            <img alt="" src={oneGid.avatar} />
            <h4>{oneGid.fullName}</h4>
            
            <div>
                <strong>{oneGid.description}</strong>
            </div>
            <div>
                {oneGid.contactInfo}
            </div>
        </div>
    )
}