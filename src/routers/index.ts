import Home from 'pages/Home'
import NotFound from 'pages/NotFound'

interface RouterType {
  path: string
  title?: string
  element: () => JSX.Element | null
  children?: RouterType[]
}

export const dialogRoutes: RouterType[] = [
  {
    path: '/account/:id/edit/:sId',
    element: NotFound,
  },
]
export const privateRoutes: RouterType[] = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/not-found',
    element: NotFound,
  },
]
