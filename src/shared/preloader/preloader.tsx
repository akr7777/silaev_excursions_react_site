import "./preloader.scss"

import preloderImage from "../../assets/animation/preloader.gif"

export const Preloader = () => {
    return (
        <div className="preloader">
            <img alt="" src={preloderImage} />
        </div>
    )
}