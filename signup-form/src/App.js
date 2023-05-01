import "./App.css";
import { useState } from "react";
import validator from "validator";
function App() {
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const handleChange = (e) => {
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });

    if (validator.isEmail(e.target.value)) {
      setError("");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!validator.isEmail(signupInput.email)) {
      setError("the email you input is invalid");
    }
  };
  return (
    <div className="container my-5">
      <form onClick={handleClick}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>

          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={signupInput.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>

          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={signupInput.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>

          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="form-control"
            value={signupInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && (
          <p className="text-danger" data-testid="errorMessage">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
