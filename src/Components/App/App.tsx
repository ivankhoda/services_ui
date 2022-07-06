import React from "react";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import "../../style.scss";
import { Dashboard } from "../Dashboard/Dashboard";
import { Header } from "../Header/Header";
import { Orders } from "../Orders/Orders";
import { Sidebar } from "../Sidebar/Sidebar";
import { Statistics } from "../Statistics/Statistics";
import { Wallet } from "../Wallet/Wallet";
import { WorkingPanel } from "../WorkingPanel/WorkingPanel";
import "./App.style.scss";

export const App = () => {
  const routes = [
    { path: "/", name: "Orders", Component: <Orders /> },
    { path: "/dashboard", name: "Dashboard", Component: <Dashboard /> },
    { path: "/statistics", name: "Statistics", Component: <Statistics /> },
    { path: "/wallet", name: "Wallet", Component: <Wallet /> },
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
