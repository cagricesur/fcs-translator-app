import React from "react";
import { IRoute } from "../models";

export const RoutesConfig: IRoute[] = [
  {
    path: "/",
    caption: "HOME",
    view: React.lazy(() => import("../views/Home")),
  },
  {
    path: "/about",
    caption: "ABOUT",
    view: React.lazy(() => import("../views/About")),
  },
];
