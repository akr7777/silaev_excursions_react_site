import { Outlet } from 'react-router'
import './main-app-classes.scss'

export const MainAppPage = () => {
    return (
        <div className='main-app-wrapper'>
            <div>MAIN PAGE</div>
            <Outlet />
        </div>
    )
}