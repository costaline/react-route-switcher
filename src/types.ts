import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router';
import { RouteProps } from 'react-router-dom';

export interface RouteMeta extends Record<string, unknown> {
  skip?: boolean;
}

export interface RouteType<M = {}> extends RouteProps {
  meta?: M & RouteMeta;
  routes?: RouteType<M>[];
  redirect?: string | [string, boolean];
  path?: string;
}

export interface RouteSwitcherProps {
  path?: string;
  routes: RouteType[];
  routeComponent?: ComponentType<any>;
  parentComponentProps?: RouteComponentProps<any>;
}
