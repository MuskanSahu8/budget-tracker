import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import apiClient from "../../ApiClient/interceptor";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [visible, setVisible] = useState(false);

  const onHandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signup = async () => {
    try {
      const response = await apiClient.post(
        "/auth/signup",
        formData
      );

      console.log("Signup response:", response.data);

      alert("Signup Successful");
      navigate("/signin");

    } catch (err) {
      console.log("Signup error:", err);

      alert(
        err.response?.data?.message || "Signup failed"
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    signup();
  };

  return (
    <div className="signinPage">

      {/* LEFT SIDE */}
      <div className="signinInfo">

        <h1>Start Managing Your Money 💰</h1>

        <p>
          Create your Budget Tracker account and take control
          of your everyday spending. Keep your income,
          expenses and budgets organized in one place.
        </p>

        <div className="features">
          <p>📊 Track your expenses</p>
          <p>💵 Manage your monthly budget</p>
          <p>📈 Understand your spending habits</p>
          <p>🎯 Work towards your financial goals</p>
        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="form1">

        <fieldset>

          <h2>Create Account 🚀</h2>

          <p className="smallText">
            Sign up to start managing your budget.
          </p>

          <form onSubmit={handleSubmit}>

            <label htmlFor="userName">
              User Name
            </label>

            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Enter your name"
              value={formData.userName}
              onChange={onHandleChange}
              required
            />


            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={onHandleChange}
              required
            />


            <label htmlFor="password">
              Password
            </label>

            <div className="passwordContainer">

              <input
                type={visible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a password"
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


            <button type="submit">
              Create Account
            </button>

          </form>


          <p className="signupText">
            Already have an account?{" "}
            <Link to="/signin">
              Sign in
            </Link>
          </p>

        </fieldset>

      </div>

    </div>
  );
};

export default Signup;