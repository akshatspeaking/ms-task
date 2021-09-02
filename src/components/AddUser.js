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
      <button onClick={toggleScreen} className="p-2 md:w-40 ">
        <div className="flex items-center p-4 bg-green-200 rounded-lg shadow-xs cursor-pointer hover:bg-green-500 hover:text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
          <div>
            <p class=" text-xs font-medium ml-2 ">List of Users</p>
          </div>
        </div>
      </button>
      <div className="pt-8 flex flex-col gap-8 items-center justify-center">
        <input
          className="p-1 rounded"
          type="text"
          value={username}
          placeholder="Username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-1 rounded"
          type="text"
          value={firstName}
          placeholder="First Name"
          name="first_name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="p-1 rounded"
          type="text"
          value={lastName}
          placeholder="Last Name"
          name="last_name"
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="p-1 rounded"
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-1 rounded"
          type="password"
          name="pwd"
          id="pwd"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={addUserToList} className="p-2 md:w-40 ">
          <a
            href="#"
            className="flex items-center p-4 bg-blue-200 rounded-lg shadow-xs cursor-pointer hover:bg-blue-500 hover:text-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <div>
              <p class=" text-xs font-medium ml-2 ">Add To List</p>
            </div>
          </a>
        </button>
      </div>
    </div>
  );
}
