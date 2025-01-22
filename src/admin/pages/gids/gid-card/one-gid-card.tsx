import { v4 } from "uuid"
import { GidType } from "../../../../store/features/gidSlice/types/gid-types"
import { decodeContactsFromString } from "../separate-gid/contact-info/gid-cont-functions"

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
            <div className="one-gid-col">
                {oneGid.contactInfo && Object.entries(decodeContactsFromString(oneGid.contactInfo))
                    .map(([key, value]) => (
                        <div key={v4()}>
                            {`${key}: ${value}`}
                        </div>
                    ))
                    // .map(el => <div key={v4()}>{el}</div>)
                }
            </div>
        </div>
    )
}