import * as React from 'react'
import {ComponentType, FC} from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { RouteMeta, RouteSwitcherProps } from './types'

export const RouteSwitcher: FC<RouteSwitcherProps> = (props: RouteSwitcherProps) => {
  const { routes, path = '', routeComponent: RouteComponent = Route, parentComponentProps = {} } = props;

  return (
    <Switch>
      {routes.map((item, i) => {
        const { path: routePath = '', routes: subRoutes, redirect, meta, component: Component, ...restRouteProps } = item;

        if (meta?.skip) return null;

        if (subRoutes && subRoutes.length) {
          return (
            <RouteComponent
              key={path + routePath || i}
              path={path + routePath}
              render={(componentProps: RouteComponentProps<any>) => (
                <RouteSwitcher parentComponentProps={componentProps} path={path + routePath} routes={subRoutes} />
              )}
            />
          );
        }

        if (redirect) {
          let pathToRedirect = '';

          if (Array.isArray(redirect)) {
            const [redirectPath, isRoot] = redirect;

            pathToRedirect = isRoot ? redirectPath : path + redirectPath;
          } else {
            pathToRedirect = path + redirect;
          }

          return (
            <Redirect key={path + routePath || i} from={path + routePath} to={pathToRedirect} {...restRouteProps} />
          );
        }

        if (isComponent(Component)) {
          return (
            <RouteComponent
              key={path + routePath || i}
              path={path + routePath}
              {...restRouteProps}
              render={(componentProps: RouteComponentProps<any>) => (
                <Component {...componentProps} {...parentComponentProps} meta={meta} />
              )}
            />
          );
        }

        return null;
      })}
    </Switch>
  );
};

function isComponent(component: unknown): component is ComponentType<any & RouteMeta> {
  return !!component;
}

