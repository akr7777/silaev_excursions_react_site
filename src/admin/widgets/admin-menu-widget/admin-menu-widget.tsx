import { NavLink } from "react-router"
import { PATHS } from "../../../router/router"
import { LOCAL_STORAGE_ACCESS_TOKEN } from "../../../shared/consts"
import { projectInitialization } from "../../../shared/init-function/project-initialization"

import "./menu-classes.scss"

import logoutIcon from "../../../assets/icons/logout-icon.png"
import { useAppDispatch } from "../../../store/store"
import { authSliceActions } from "../../../store/features/auth/model/auth-slice"

export const AdminMenuWidget = () => {
    const dispatch = useAppDispatch()

    const navLinkStyle = "admin-menu-navlink-class"
    
    const logoutFunction = () => {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN)
        projectInitialization()
        dispatch(authSliceActions.setAdmin({login: null}))
    }
    return (
        <div className="admin-menu-container">
            <div className="admin-menu-classes">

                <NavLink 
                    to={PATHS.news}
                    className={navLinkStyle}
                >
                    Новости
                </NavLink>

                <NavLink 
                    to={PATHS.events}
                    className={navLinkStyle}
                >
                    Мероприятия
                </NavLink>

                <NavLink 
                    to={PATHS.gids}
                    className={navLinkStyle}
                >
                    Экскурсоводы
                </NavLink>

                {/* <NavLink 
                    to={PATHS.rootPath}
                    className={"navlink-class"}
                >
                    Вернуться на сайт
                </NavLink> */}

                

            </div>

            <div className="admin-menu-logout">
                    <img alt="" src={logoutIcon} onClick={() => logoutFunction()}/>
            </div>
        </div>
    )
}