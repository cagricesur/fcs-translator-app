import React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import { RoutesConfig } from "../../config";

export const Content: React.FunctionComponent = () => {
  return (
    <Layout.Content className="fcs-content">
      <Switch>
        {RoutesConfig.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={true}
              component={route.view}
            ></Route>
          );
        })}
        <Route
          key={RoutesConfig.length}
          component={React.lazy(() => import("../../views/Error"))}
        ></Route>
      </Switch>
    </Layout.Content>
  );
};
