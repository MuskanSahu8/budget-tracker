import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [visible, setVisible] = useState(false);

  const onHandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await login(formData);

    if (user) {
      alert("Signin Successful");
      navigate("/");
    } else {
      alert("Signin failed");
    }
  };

  return (
    <div className="signinPage">

      {/* LEFT SIDE */}
      <div className="signinInfo">

        <h1>Take Control of Your Money 💰</h1>

        <p>
          Manage your finances easily with our Budget Tracker.
          Keep track of your income, expenses and monthly budget
          all in one place.
        </p>

        <div className="features">
          <p>📊 Track your expenses</p>
          <p>💵 Manage your monthly budget</p>
          <p>📈 Understand your spending</p>
          <p>🎯 Reach your financial goals</p>
        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="form1">

        <fieldset>

          <h2>Welcome Back! 👋</h2>

          <p className="smallText">
            Sign in to continue managing your budget.
          </p>

          <form onSubmit={handleSubmit}>

            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={onHandleChange}
              required
            />

            <br />

            <label htmlFor="password">
              Password
            </label>

            <div className="passwordContainer">

              <input
                type={visible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={onHandleChange}
                required
              />

              <div
                id="eyeFeature"
                onClick={() => setVisible(!visible)}
              >
                {visible ? <EyeOff /> : <Eye />}
              </div>

            </div>

            <br />

            <button type="submit">
              Signin
            </button>

          </form>

          <p className="signupText">
            Don't have an account?{" "}
            <Link to="/signup">
              Create an account
            </Link>
          </p>

        </fieldset>

      </div>

    </div>
  );
};

export default Signin;