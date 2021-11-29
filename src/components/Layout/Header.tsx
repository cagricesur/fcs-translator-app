import React, { useRef } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Image, Layout, Menu, Typography } from "antd";
import { Drawer, IDrawerRefs } from "../Drawer";
import { RoutesConfig } from "../../config";
import { useHistory } from "react-router";

export const Header: React.FunctionComponent = () => {
  const drawerRef = useRef<IDrawerRefs>(null);
  const nav = useHistory();
  const toggleDrawer = () => {
    drawerRef.current &&
      (drawerRef.current.visible = !drawerRef.current.visible);
  };

  const onLogoClick = () => {
    nav.push("/");
  };
  const onMenuClick = (menu: { key: string }) => {
    nav.push(menu.key);
    toggleDrawer();
  };
  return (
    <React.Fragment>
      <Drawer ref={drawerRef} title="MENU" placement="right">
        <Menu className="fcs-menu" onClick={onMenuClick} selectable={false}>
          {RoutesConfig.map((route) => {
            return <Menu.Item key={route.path}>{route.caption}</Menu.Item>;
          })}
        </Menu>
      </Drawer>
      <Layout.Header className="fcs-header">
        <div className="fcs-header-container" onClick={onLogoClick}>
          <Image
            alt=""
            className="fcs-header-img"
            src={`${process.env.PUBLIC_URL}/logo64.png`}
            height={48}
            preview={false}
          />
          <Typography.Text className="fcs-header-title">
            FCS Translator
          </Typography.Text>
        </div>
        <Button ghost={true} icon={<MenuOutlined />} onClick={toggleDrawer} />
      </Layout.Header>
    </React.Fragment>
  );
};
