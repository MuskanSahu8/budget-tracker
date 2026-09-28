import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import apiClient from "../../ApiClient/interceptor";
import { useNavigate } from "react-router-dom";

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
    <div className="form2">

      <fieldset>

        <h2>Signup</h2>

        <br />

        <form onSubmit={handleSubmit}>

          <label htmlFor="userName">
            User Name
          </label>

          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={onHandleChange}
          />

          <br />

          <label htmlFor="email">
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onHandleChange}
          />

          <br />

          <label htmlFor="password">
            Password
          </label>

          <div className="passwordContainer">

            <input
              type={visible ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={onHandleChange}
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
            Signup
          </button>

        </form>

      </fieldset>
    </div>
  );
};

export default Signup;