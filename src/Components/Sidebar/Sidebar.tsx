import React from "react";
import { Menu } from "../Menu/Menu";
import "./Sidebar.style.scss";

export const Sidebar = () => {
  return (
    <div className="Sidebar">
      <h2>Autoservice</h2>

      <Menu />
    </div>
  );
};
