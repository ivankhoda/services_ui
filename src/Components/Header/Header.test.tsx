import { createContainer } from "../../TestHelpers/domManipulators";
import { Avatar } from "../Avatar/Avatar";
describe("Header", () => {
  let render, container;
  beforeEach(() => {
    ({ render, container } = createContainer());
  });
  it("Should reders an avatar component", () => {
    render(<Avatar />);
    expect(<Avatar />).not.toBe(null);
  });
});
