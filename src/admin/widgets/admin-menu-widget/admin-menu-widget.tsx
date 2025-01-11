import { NavLink } from "react-router"
import { PATHS } from "../../../router/router"

import "./manu-classes.scss"

export const AdminMenuWidget = () => {
    return (
        <div className="admin-menu-classes">
           <NavLink to={PATHS.admin.news}>Новости</NavLink>
           <NavLink to={PATHS.admin.events}>Мероприятия</NavLink>
        </div>
    )
}