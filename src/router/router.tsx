import { Routes, Route } from "react-router";
import { MainAppPage } from "../pages/main-app-page/main-app-page";
import { AuthPage } from "../admin/pages/auth/auth-page";
import { NotFoundPage } from "../pages/not-found-page/not-found";
import { MainAdminPage } from "../admin/pages/main-admin-page/main-admin-page";
import { PrivateRoute } from "./private-router";
import { AdminNews } from "../admin/pages/news/admin-news";
import { AdminSeparateNew } from "../admin/pages/news/separate-new/saparate-new";
import { AdminSeparateEvent } from "../admin/pages/events/separate-event/saparate-event";
import { AdminEvents } from "../admin/pages/events/admin-events";
import { projectInitialization } from "../shared/init-function/project-initialization";

export const PATHS = {
  rootPath: '/',
  auth: '/auth/',
  admin: {
    root: '/admin',
    events: '/admin/events/',
    news: '/admin/news/',
  }
}

export const AppRouter = () => {

    // init project
    projectInitialization()

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

         
          {/* <Route path={PATHS.admin.news} element={<AdminNews />}>
            <Route path={":newId"} element={<AdminSeparateNew />} />
          </Route> */}
          <Route path={PATHS.admin.news} element={<AdminNews />} />
          <Route path={PATHS.admin.news + ":newId"} element={<AdminSeparateNew />} />

          <Route path={PATHS.admin.events} element={<AdminEvents />} />
          <Route path={PATHS.admin.events + ":eventId"} element={<AdminSeparateEvent />} />

        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    )
}