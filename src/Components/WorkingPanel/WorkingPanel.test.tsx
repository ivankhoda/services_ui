import { createContainer } from "../../../TestHelpers/domManipulators";

describe("Working panel", () => {
  let container, render;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it("Should make an initial fetch request with the right propeties", () => {
    //const fetchSpy = spy()
  });
});

// it('calls fetch with the right properties when submitting data', async ()
// => {
//   const fetchSpy = spy();
//   render(
//     <CustomerForm fetch={fetchSpy.fn} onSubmit={() => {}} />
//   );
//   ReactTestUtils.Simulate.submit(form('customer'));
//   expect(fetchSpy).toHaveBeenCalled();
// If you've test-driven this matcher, two tests should have been enough to cover it, since it consists of a single conditional. Any time you see a conditional in the production code, that automatically means you need two tests to ensure it's fully covered.
// The Git tag for this section is stubbing-fetch.
// [ 114 ]

// Exploring Test Doubles
// Chapter 3
// expect(fetchSpy.receivedArgument(0)).toEqual('/customers');
// const fetchOpts = fetchSpy.receivedArgument(1);
// expect(fetchOpts.method).toEqual('POST');
// expect(fetchOpts.credentials).toEqual('same-origin');
// expect(fetchOpts.headers).toEqual({
//  'Content-Type': 'application/json'
// });
// });
