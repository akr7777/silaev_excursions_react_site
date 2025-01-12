import { Navigate } from "react-router";
import { PATHS } from "./router";
import { ReactElement } from "react";
import { useAppSelector } from "../store/store";

export const PrivateRoute = ( {element} : {element: ReactElement} ):ReactElement => {
    const login: string | null = useAppSelector(state => state.authSlice.user.login)
    const isAuthentificated: boolean = login !== null && login.length > 0
    return isAuthentificated ? element : <Navigate to={PATHS.auth} />;
};