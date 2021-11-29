import React from "react";
import { Layout as AntdLayout } from "antd";

export const Layout: React.FunctionComponent = (props) => {
  return <AntdLayout className="fcs-wrapper">{props.children}</AntdLayout>;
};
