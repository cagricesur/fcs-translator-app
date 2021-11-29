import React from "react";
import { Button, Result } from "antd";
import { useHistory } from "react-router";

const Error: React.FunctionComponent = () => {
  const nav = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          onClick={() => {
            nav.push("/");
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default Error;
