import { NavLink } from 'react-router'
import { PATHS } from '../../../router/router'

import './not-found.scss'

export const NotFoundPage = () => {
    return (
        <div className='not-found'>
            <h4>Страница не найдена.</h4>
            <NavLink to={PATHS.rootPath}>Проследуйте на главную страницу</NavLink>
        </div>
    )
}