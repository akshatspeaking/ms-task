import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

export default function ViewUsers({ toggleScreen, activeScreen }) {
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(fetchUserList, [activeScreen]);

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

  return (
    <div className="p-4">
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
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p class=" text-xs font-medium ml-2 ">New User</p>
          </div>
        </div>
      </button>
      <div className="flex gap-10 flex-wrap">
        {listOfUsers.map((userObj) => (
          <UserCard
            userObj={userObj}
            fetchUserList={fetchUserList}
            key={userObj.email + userObj.username}
          />
        ))}
      </div>
    </div>
  );
}
