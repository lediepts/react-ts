import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Layout from 'components/Layout'
import MaterialProvider from 'components/Layout/theme'
import jaLocale from 'date-fns/locale/ja'
import NotFound from 'pages/NotFound'
import { Route, Routes } from 'react-router-dom'
import { dialogRoutes, privateRoutes } from './routers'

function App() {
  return (
    <MaterialProvider>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={jaLocale}
      >
        <Routes>
          {dialogRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            )
          })}
          {privateRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <route.element />
                  </Layout>
                }
              />
            )
          })}
          <Route element={<NotFound />} path="*"></Route>
        </Routes>
      </LocalizationProvider>
    </MaterialProvider>
  )
}

export default App
