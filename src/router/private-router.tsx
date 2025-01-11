import { Navigate } from "react-router";
import { PATHS } from "./router";
import { ReactElement } from "react";

export const PrivateRoute = ( {element} : {element: ReactElement} ):ReactElement => {
    // const userId: string = useAppSelector(state => state.authSlice.user.userId)
    const isAuthentificated: boolean = false
    return isAuthentificated ? element : <Navigate to={PATHS.auth} />;
};