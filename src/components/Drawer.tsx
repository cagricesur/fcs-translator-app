import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer as AntdDrawer, DrawerProps } from "antd";
import React, { useImperativeHandle } from "react";
import { useStateReducer } from "../utils";

export interface IDrawerRefs {
  visible: boolean;
}

interface IDrawerState extends IDrawerRefs {}

const DrawerComponent: React.ForwardRefRenderFunction<
  IDrawerRefs,
  React.PropsWithChildren<DrawerProps>
> = (props, ref) => {
  const [state, dispatch] = useStateReducer<IDrawerState>({
    visible: props.visible || false,
  });

  useImperativeHandle(ref, () => ({
    get visible(): boolean {
      return state.visible;
    },
    set visible(visible: boolean) {
      dispatch({ visible });
    },
  }));

  return (
    <AntdDrawer
      {...props}
      visible={state.visible}
      onClose={() => {
        dispatch({ visible: false });
      }}
      extra={
        <Button
          icon={<CloseOutlined />}
          shape="circle"
          size="large"
          onClick={() => {
            dispatch({ visible: false });
          }}
        ></Button>
      }
    >
      {props.children}
    </AntdDrawer>
  );
};

export const Drawer = React.forwardRef(DrawerComponent);
