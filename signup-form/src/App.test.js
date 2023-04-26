import { render, screen } from "@testing-library/react";
import App from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("inputs should be initially empty", () => {
  // 1) Rendering the component we want to test
  render(<App />);
  // 2) finding the elements
  const emailInputElement = screen.getByRole("textbox");
  // 3) Assertion
  expect(emailInputElement.value).toBe("");
});
