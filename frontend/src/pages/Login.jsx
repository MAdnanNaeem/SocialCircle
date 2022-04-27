import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        {" "}
        <h1>
          {" "}
          <FaSignInAlt /> Login{" "}
        </h1>{" "}
        <p>Login to your account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              className="form-control"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              className="from-control"
              onChange={onChange}
            />
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
