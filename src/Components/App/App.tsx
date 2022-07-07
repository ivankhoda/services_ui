import React from "react";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import "../../style.scss";
import { Assignees } from "../Assignees/Assignees";
import { Categories } from "../Categories/Categories";
import { Clients } from "../Clients/Clients";
import { Header } from "../Header/Header";
import { Orders } from "../Orders/Orders";
import { Sidebar } from "../Sidebar/Sidebar";
import { WorkingPanel } from "../WorkingPanel/WorkingPanel";
import "./App.style.scss";

export const App = () => {
  const routes = [
    { path: "/", name: "Orders", Component: <Orders /> },
    { path: "/clients", name: "Clients", Component: <Clients /> },
    { path: "/assignees", name: "Assignees", Component: <Assignees /> },
    { path: "/categories", name: "Categories", Component: <Categories /> },
  ];
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Sidebar />
        <WorkingPanel>
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} element={Component} />
            ))}
          </Routes>
        </WorkingPanel>
      </HashRouter>
    </div>
  );
};
