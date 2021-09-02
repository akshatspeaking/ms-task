import React from "react";

export default function UserCard({ userObj, fetchUserList }) {
  function deleteUser(email) {
    const USER_EMAIL = email;
    console.log(USER_EMAIL);
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
      <div class=" bg-gray-100 grid items-center justify-center">
        <div class="p-6 bg-white flex items-center space-x-6 rounded-lg shadow-md  transition transform duration-500 cursor-pointer">
          <button
            name={userObj.email}
            onClick={(e) => {
              deleteUser(userObj.email);
            }}
            className="absolute p-2 md:w-32 right-1"
          >
            <div className="flex items-center p-4 bg-red-200 rounded-lg shadow-xs cursor-pointer hover:bg-red-500 hover:text-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <p class="text-xs font-medium ml-2 ">DELETE</p>
            </div>
          </button>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-700 mb-2">
              {userObj.username}
            </h1>
            <p class="text-gray-600 w-80 text-sm">
              {userObj.first_name}
              <span> {userObj.last_name}</span>
            </p>
            <p class="text-gray-600 w-80 text-sm">{userObj.email} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
