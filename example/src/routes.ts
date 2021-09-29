import { lazy } from 'react'
import { RouteType } from '../../.'

type Meta = {
  title?: string;
};

export const routes: Array<RouteType<Meta>> = [
  {
    path: '/',
    component: lazy(() => import('./pages/main')),
    exact: true
  },
  {
    path: '/article',
    component: lazy(() => import('./pages/article')),
    meta: {
      title: 'Article',
      skip: true
    }
  },
  {
    path: '/foo',
    routes: [
      {
        path: '/',
        component: lazy(() => import('./pages/foo')),
        exact: true,
      },
      {
        path: '/bar',
        routes: [
          {
            path: '/',
            component: lazy(() => import('./pages/foo/bar')),
            exact: true,
          },
          {
            path: '/baz',
            component: lazy(() => import('./pages/foo/bar/baz')),
          },
          {
            path: '*',
            redirect: ['/', true]
          },
        ]
      },
      {
        path: '*',
        redirect: '/'
      },
    ]
  },
  {
    path: '/products',
    routes: [
      {
        path: '/',
        component: lazy(() => import('./pages/products')),
        exact: true
      },
      {
        path: '/cart',
        component: lazy(() => import('./pages/products/cart')),
        exact: true
      },
      {
        path: '/cart',
        redirect: '/cart'
      },
      {
        path: '/:product',
        component: lazy(() => import('./pages/products/[product]')),
      },
    ]
  },
  {
    path: '*',
    component: lazy(() => import('./pages/404')),
  },
]
