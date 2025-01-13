import { Outlet, useLocation, useNavigate } from "react-router"
import { AdminMenuWidget } from "../../widgets/admin-menu-widget/admin-menu-widget"
import { PATHS } from "../../../router/router"
import { useEffect } from "react"

import "./main-admin-page.scss"

export const MainAdminPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    
    useEffect(() => {
        if (location.pathname === PATHS.admin.root || location.pathname === PATHS.admin.root + '/') {
            navigate(PATHS.admin.news)
        }
    }, [location.pathname])
    
    
    return (
        <div className="main-admin-page">
            <AdminMenuWidget />
            <Outlet />
        </div>
    )
}