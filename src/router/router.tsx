import { Routes, Route } from "react-router";
import { MainAppPage } from "../pages/main-app-page/main-app-page";
import { AuthPage } from "../admin/pages/auth/auth-page";
import { NotFoundPage } from "../pages/not-found-page/not-found";
import { MainAdminPage } from "../admin/pages/main-admin-page/main-admin-page";
import { PrivateRoute } from "./private-router";
import { AdminNews } from "../admin/pages/news/news";

export const PATHS = {
  rootPath: '/',
  auth: '/auth',
  admin: {
    root: '/admin',
    events: '/admin/events',
    news: '/admin/news',
  }
}

export const AppRouter = () => {
    return (
      <Routes>
        {/* <Route path={PATHS.rootPath} element={<MainAppPage />} /> */}
        <Route index element={<MainAppPage />} />

        <Route 
            path={PATHS.auth} 
            element={<AuthPage />} 
          />

        <Route path={PATHS.admin.root} element={
          <PrivateRoute element={<MainAdminPage />}/>
        }>
          <Route
            path={PATHS.admin.news}
            element={<AdminNews />}
            // element={<PrivateRoute element={<AdminNews />}/>}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    )
}