// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'
import SidebarLayout from './layouts/SidebarLayout/SidebarLayout'
import SettingsPage from './pages/SettingsPage/SettingsPage'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="login">
        <Set wrap={SidebarLayout}>
          <Route path="/photos" page={PhotosPage} name="photos" />
          <Route path="/view/{id}" page={ViewPage} name="view" />
          <Route path="/settings" page={SettingsPage} name="settings" />
        </Set>
      </Private>

      <Route path="/" page={LandingPage} name="landing" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
