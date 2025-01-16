import { Routes, Route } from "react-router";
import { AuthPage } from "../admin/pages/auth/auth-page";
import { MainAdminPage } from "../admin/pages/main-admin-page/main-admin-page";
import { PrivateRoute } from "./private-router";
import { AdminNewsPage } from "../admin/pages/news/admin-news-page";
import { projectInitialization } from "../shared/init-function/project-initialization";
import { SeparateNewPage } from "../admin/pages/news/separate-new-page";
import { SeparateEventPage } from "../admin/pages/events/separate-event-page";
import { AdminEventsPage } from "../admin/pages/events/admin-event-page";
import { GidsPage } from "../admin/pages/gids/all-gids";
import { SeparateGidPage } from "../admin/pages/gids/separate-gid/saparate-gid";
import { NotFoundPage } from "../admin/pages/not-found-page/not-found";

export const PATHS = {
  rootPath: '/',
  auth: '/auth/',
  events: '/events/',
  news: '/news/',
  gids: '/gids/',
}

export const AppRouter = () => {

    // init project
    projectInitialization()

    return (
      <Routes>
        {/* <Route index element={<MainAdminPage />} /> */}

        <Route path={PATHS.auth} element={<AuthPage />} />


        <Route path={PATHS.rootPath} element={
          <PrivateRoute element={<MainAdminPage />}/>
        }>
          <Route path={PATHS.news} element={<AdminNewsPage />} />
          <Route path={PATHS.news + ":newId"} element={<SeparateNewPage />} />

          <Route path={PATHS.events} element={<AdminEventsPage />} />
          <Route path={PATHS.events + ":eventId"} element={<SeparateEventPage />} />

          <Route path={PATHS.gids} element={<GidsPage />} />
          <Route path={PATHS.gids + ":gidId"} element={<SeparateGidPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    )
}