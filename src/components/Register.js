import React, { useState } from "react";
import { navigate } from "@reach/router";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function onChangePassword2(e) {
    setPassword2(e.target.value);
  }

  function handleLogin(e) {
    e.preventDefault();

    if (password !== password2) {
      console.log("Passwords do not match");
      return;
    }
    //Ukoliko se drugi argument ne navede, defaultno ponašanje je slanje get zahtjeva. 
    fetch("http://localhost:3000/api/register", {//prvi arg. ruta, drugi arg. je tip requesta, body i definiran headers
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
      .then((resp) => resp.json())//fetch vraca promise
      .then((data) => {//ako se uspijesno resolva
        console.log("User Registered!");
        navigate("/login");
      })
      .catch((err) => console.log(err));//ako se promise rejecta
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          onChange={onChangeEmail}
          onBlur={onChangeEmail}
        ></input>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={onChangePassword}
          onBlur={onChangePassword}
        ></input>

        <label htmlFor="repeat password">Repeat Password</label>
        <input
          type="password"
          value={password2}
          onChange={onChangePassword2}
          onBlur={onChangePassword2}
        ></input>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default Register;