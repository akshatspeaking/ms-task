import React, { useEffect, useState } from "react";

export default function ViewUsers({ toggleScreen }) {
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(fetchUserList, []);

  function fetchUserList() {
    const GET_URL = "http://3.6.93.159:7883/machstatz/get_all_users";

    fetch(GET_URL, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(setListOfUsers);
  }

  function deleteUser(e) {
    const USER_EMAIL = e.target.name;

    const DEL_URL = "http://3.6.93.159:7883/machstatz/delete_existing_user";

    fetch(`${DEL_URL}?email=${USER_EMAIL}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.status === "Deleted") {
          fetchUserList();
        }
      });
  }

  return (
    <div>
      <ul>
        {listOfUsers.map((userObj) => (
          <li className="UserBox" key={userObj.email + userObj.username}>
            {userObj.email}
            <button name={userObj.email} onClick={deleteUser}>
              Del
            </button>
          </li>
        ))}
      </ul>
      <button onClick={toggleScreen}>Add User</button>
    </div>
  );
}
