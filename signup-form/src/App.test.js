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

describe("test the app component", () => {
  test("inputs should be initially empty", () => {
    // 1) Rendering the component we want to test

    // 2) finding the elements

    // 3) Assertion
    expect(screen.getByRole("textbox").value).toBe("");
    expect(screen.getByLabelText(/confirm password/i).value).toBe("");
    expect(screen.getByLabelText(/confirm password/i).value).toBe("");
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

  describe("tests for error handling", () => {
    test("should show email Error message on invalid email", () => {
      // const emailErrorElement = screen.queryByText(
      //   /the email you input is invalid/i
      // ); // null

      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument();

      typeIntoForm({ email: "whateveremail" });

      clickOnSubmitButton();

      expect(
        screen.queryByText("the email you input is invalid")
      ).toBeInTheDocument();
    });

    test("should show password error if password is less than 5 characters", () => {
      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i
        )
      ).not.toBeInTheDocument();

      typeIntoForm({
        email: "whateveremail@gmail.com",
        password: "123",
      });
      clickOnSubmitButton();

      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i
        )
      ).toBeInTheDocument();
    });

    test("should show Confirm password error if password don't match", () => {
      expect(
        screen.queryByText(/the password don't match, try again/i)
      ).not.toBeInTheDocument();

      typeIntoForm({
        email: "whateveremail@gmail.com",
        password: "12345",
        confirmPassword: "12345",
      });
      clickOnSubmitButton();

      expect(
        screen.queryByText(/the password don't match, try again/i)
      ).toBeInTheDocument();
    });

    test("should show No error message if every input is valid", async () => {
      typeIntoForm({
        email: "whateveremail@gmail.com",
        password: "12345",
        confirmPassword: "12345",
      });
      await clickOnSubmitButton();

      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i
        )
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/The password don't match, try again/i)
      ).not.toBeInTheDocument();
    });
  });
});
