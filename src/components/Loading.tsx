import { Spin } from "antd";
import React from "react";

export const Loading: React.FunctionComponent = () => {
  return (
    <Spin
      spinning={true}
      delay={100}
      className="fcs-spinner"
      tip="Loading..."
    />
  );
};
