import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Content, Footer, Header, Layout } from "./components";
import "antd/dist/antd.css";
import "./theme/theme.scss";

const App: React.FunctionComponent<RouteComponentProps> = (props) => {
  return (
    <Layout>
      <Header />
      <Content></Content>
      <Footer></Footer>
    </Layout>
  );
};

export default withRouter(App);
