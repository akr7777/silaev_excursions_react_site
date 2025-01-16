import { PropsWithChildren } from "react"
import "./bg-outlet.scss"

export const BgOutlet = (props: PropsWithChildren) => {
    return (
        <div className="bg-outlet">
            {props.children}
        </div>
    )
}