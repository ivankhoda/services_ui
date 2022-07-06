//import "whatwg-fetch";
import { createContainer } from "../../TestHelpers/domManipulators";
import { Header } from "../Header/Header";
import { Login } from "../Login/Login";
import { Sidebar } from "../Sidebar/Sidebar";
import { WorkingPanel } from "../WorkingPanel/WorkingPanel";
import { App } from "./App";

describe("App", () => {
  let container, render;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });
  it("Should render Login if not logged in", () => {
    render(<Login />);
    expect(<Login />).not.toBe(null);
  });

  it("Should render App main component", () => {
    render(<App />);
    expect(<App />).not.toBe(null);
  });
  it("Should render Header component", () => {
    render(<Header />);

    expect(<Header />).not.toBe(null);
  });
  it("Should render Sidebar component", () => {
    render(<Sidebar />);

    expect(<Sidebar />).not.toBe(null);
  });
  it("Should render Workingpanel component", () => {
    render(<WorkingPanel />);

    expect(<WorkingPanel />).not.toBe(null);
  });
});
