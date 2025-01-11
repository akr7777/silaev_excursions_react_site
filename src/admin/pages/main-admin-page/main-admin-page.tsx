import { Outlet } from "react-router"
import { AdminMenuWidget } from "../../widgets/admin-menu-widget/admin-menu-widget"

import "./main-admin-page.scss"

export const MainAdminPage = () => {
    return (
        <div className="main-admin-page">
            <AdminMenuWidget />
            <Outlet />
        </div>
    )
}