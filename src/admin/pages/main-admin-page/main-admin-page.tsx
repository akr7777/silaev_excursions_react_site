import { Outlet, useLocation, useNavigate } from "react-router"
import { AdminMenuWidget } from "../../widgets/admin-menu-widget/admin-menu-widget"
import { PATHS } from "../../../router/router"
import { useEffect } from "react"

import "./main-admin-page.scss"

export const MainAdminPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    
    useEffect(() => {
        if (location.pathname === PATHS.rootPath || location.pathname === PATHS.rootPath + '/') {
            navigate(PATHS.news)
        }
    }, [location.pathname])
    
    
    return (
        <div className="main-admin-page">
            <AdminMenuWidget />
            <Outlet />
        </div>
    )
}