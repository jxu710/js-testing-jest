import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { type } from "@testing-library/user-event/dist/type";

beforeEach(() => {
  render(<App />);
});

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }

  if (password) {
    userEvent.type(passwordInputElement, password);
  }

  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  // return so the later test blocks can access below elements

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

const clickOnSubmitButton = () => {
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.click(submitBtnElement);
};

test("inputs should be initially empty", () => {
  // 1) Rendering the component we want to test

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
  const { emailInputElement } = typeIntoForm({
    email: "selena@gmail.com",
  });

  //或者
  // const  result  = typeIntoForm({
  //   email: "selena@gmail.com",
  // }).emailInputElement;
  expect(emailInputElement.value).toBe("selena@gmail.com");
});

test("should be able to type a password", () => {
  const { passwordInputElement } = typeIntoForm({
    password: "password!",
  });
  expect(passwordInputElement.value).toBe("password!");
});

test("should be able to type a Confirm password", () => {
  const { confirmPasswordInputElement } = typeIntoForm({
    confirmPassword: "password!",
  });
  expect(confirmPasswordInputElement.value).toBe("password!");
});

test("should show email Error message on invalid email", () => {
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  ); // null

  expect(emailErrorElement).not.toBeInTheDocument();

  typeIntoForm({ email: "whateveremail" });

  clickOnSubmitButton();

  const emailErrorElementAgain = screen.queryByText(
    "the email you input is invalid"
  );
  expect(emailErrorElementAgain).toBeInTheDocument();
});

test("should show password error if password is less than 5 characters", () => {
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  expect(passwordErrorElement).not.toBeInTheDocument();

  typeIntoForm({
    email: "whateveremail@gmail.com",
    password: "123",
  });
  clickOnSubmitButton();
  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test("should show Confirm password error if password don't match", () => {
  const confirmPasswordErrorElement = screen.queryByText(
    /the password don't match, try again/i
  );

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  typeIntoForm({
    email: "whateveremail@gmail.com",
    password: "12345",
    confirmPassword: "12345",
  });
  clickOnSubmitButton();
  const confirmPasswordErrorElementAgain = screen.queryByText(
    /the password don't match, try again/i
  );
  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});

test("should show No error message if every input is valid", async () => {
  typeIntoForm({
    email: "whateveremail@gmail.com",
    password: "12345",
    confirmPassword: "12345",
  });
  await clickOnSubmitButton();

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
