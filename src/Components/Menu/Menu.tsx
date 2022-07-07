import React from "react";
import { MenuItem } from "../Link/Link";
import "./Menu.style.scss";
//TODO make components as array
export const Menu = () => {
  return (
    <ul className="Menu">
      <MenuItem linkTo="/" text="Orders" />
      <MenuItem linkTo="/clients" text="Clients" />
      <MenuItem linkTo="/assignees" text="Assignees" />
      <MenuItem linkTo="/categories" text="Categories" />
    </ul>
  );
};
