import { findAllByRole } from "@testing-library/react";
import React, { useEffect, useState } from "react";

export default function AddUser({ toggleScreen }) {
  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  function validateEmail() {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase()) === false) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  }

  useEffect(validateEmail, [email]);

  function addUserToList() {
    if (!firstName || !lastName || !email || !password || !username) {
      return alert("All fields are compulsory.");
    }

    if (emailError) {
      return alert(emailError);
    }

    const POST_URL = "http://3.6.93.159:7883/machstatz/add_new_user";

    const USEROBJ = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      pwd: password,
      username: username,
    };

    fetch(POST_URL, {
      method: "POST",
      body: JSON.stringify(USEROBJ),
    }).then((res) =>
      res.json().then((data) => {
        alert(data.message);
        if (data.status === "Success") {
          toggleScreen();
        }
      })
    );
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} action="#">
        <input
          type="text"
          value={username}
          placeholder="Username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          name="first_name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          name="last_name"
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="pwd"
          id="pwd"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={addUserToList}>Add User</button>
      </form>
      <button onClick={toggleScreen}>View List</button>
    </div>
  );
}
