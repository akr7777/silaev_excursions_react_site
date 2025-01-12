import { NavLink, useParams } from "react-router"
import { PATHS } from "../../../router/router"

import "./manu-classes.scss"

export const AdminMenuWidget = () => {
    
    
    return (
        <div className="admin-menu-classes">

            <NavLink 
                to={PATHS.admin.news}
                className={"navlink-class"}
            >
                Новости
            </NavLink>

            <NavLink 
                to={PATHS.admin.events}
                className={"navlink-class"}
            >
                Мероприятия
            </NavLink>

        </div>
    )
}