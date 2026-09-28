import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

    console.log("Logged in user:", user);

    if (user) {

      alert("Signin Successful");

      navigate("/");

    } else {

      alert("Signin failed");

    }
  };

  return (
    <div className="form1">

      <fieldset>

        <h2>Signin</h2>

        <form onSubmit={handleSubmit}>

          <label htmlFor="email">
            Email
          </label>

          <input
            type="email"
            name="email"
            id="email"
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
              name="password"
              id="password"
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
            Signin
          </button>

        </form>

      </fieldset>

    </div>
  );
};

export default Signin;