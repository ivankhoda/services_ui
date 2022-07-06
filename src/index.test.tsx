import ReactDOM from "react-dom";
import { App } from "../src/App/App";

describe("Index", () => {
  it("Should render main component", () => {
    const component = <App />;
    const container = document.createElement("root");
    document.body.appendChild(container);
    ReactDOM.render(component, container);
  });
});
