import { Outlet } from "react-router"

export const MainAppWrapper = () => {
    return (
        <div>
            <div>Main wrapper</div>
            <Outlet />
        </div>
    )
}