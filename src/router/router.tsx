import { Routes, Route } from "react-router";
import { MainAppPage } from "../pages/main-app-page/main-app-page";
import { AuthPage } from "../admin/pages/auth/auth-page";
import { NotFoundPage } from "../pages/not-found-page/not-found";
import { MainAdminPage } from "../admin/pages/main-admin-page/main-admin-page";
import { PrivateRoute } from "./private-router";
import { AdminNewsPage } from "../admin/pages/news/admin-news-page";
import { projectInitialization } from "../shared/init-function/project-initialization";
import { SeparateNewPage } from "../admin/pages/news/separate-new-page";
import { SeparateEventPage } from "../admin/pages/events/separate-event-page";
import { AdminEventsPage } from "../admin/pages/events/admin-event-page";
import { GidsPage } from "../admin/pages/gids/all-gids";
import { SeparateGidPage } from "../admin/pages/gids/separate-gid/saparate-gid";

export const PATHS = {
  rootPath: '/',
  auth: '/auth/',
  admin: {
    root: '/admin',
    events: '/admin/events/',
    news: '/admin/news/',
    gids: '/admin/gids/',
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
          <Route path={PATHS.admin.news} element={<AdminNewsPage />} />
          <Route path={PATHS.admin.news + ":newId"} element={<SeparateNewPage />} />

          <Route path={PATHS.admin.events} element={<AdminEventsPage />} />
          <Route path={PATHS.admin.events + ":eventId"} element={<SeparateEventPage />} />

          <Route path={PATHS.admin.gids} element={<GidsPage />} />
          <Route path={PATHS.admin.gids + ":gidId"} element={<SeparateGidPage />} />

        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    )
}