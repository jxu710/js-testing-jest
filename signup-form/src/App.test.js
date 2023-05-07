import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  // 3) Assertion
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("should be able to type an email", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  userEvent.type(emailInputElement, "selena@gmail.com");
  expect(emailInputElement.value).toBe("selena@gmail.com");
});

test("should be able to type a password", () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText("Password");

  userEvent.type(passwordInputElement, "password!");
  expect(passwordInputElement.value).toBe("password!");
});

test("should be able to type a Confirm password", () => {
  render(<App />);
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  userEvent.type(confirmPasswordInputElement, "password!");
  expect(confirmPasswordInputElement.value).toBe("password!");
});

test("should show email Error message on invalid email", () => {
  render(<App />);
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  ); // null
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "whateveremail");
  userEvent.click(submitBtnElement);

  const emailErrorElementAgain = screen.queryByText(
    "the email you input is invalid"
  );
  expect(emailErrorElementAgain).toBeInTheDocument();
});

test("should show password error if password is less than 5 characters", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  const passwordInputElement = screen.getByLabelText("Password");
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });
  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "whateveremail@gmail.com");
  userEvent.type(passwordInputElement, "123");
  userEvent.click(submitBtnElement);
  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test("should show Confirm password error if password don't match", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordErrorElement = screen.queryByText(
    /the password don't match, try again/i
  );

  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "whateveremail@gmail.com");
  userEvent.type(passwordInputElement, "12345");
  userEvent.type(confirmPasswordInputElement, "123456");
  userEvent.click(submitBtnElement);
  const confirmPasswordErrorElementAgain = screen.queryByText(
    /the password don't match, try again/i
  );
  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});

test("should show No error message if every input is valid", async () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  const passwordInputElement = screen.getByLabelText("Password");

  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.type(emailInputElement, "whateveremail@gmail.com");
  userEvent.type(passwordInputElement, "12345");
  userEvent.type(confirmPasswordInputElement, "12345");

  await userEvent.click(submitBtnElement);

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  const confirmPasswordErrorElement = screen.queryByText(
    /The password don't match, try again/i
  );
  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElementAgain).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});
