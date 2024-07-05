import UsersList from "@/components/UsersList";
import { listUsers } from "@/features/users/usersActions";
import { setSearchQuery } from "@/features/users/usersSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const auth = useSelector((state) => state.auth);
  const { userInfo, loading, error } = auth;
  const users = useSelector((state) => state.users);
  const { searchQuery, userList } = users;
  const dispatch = useDispatch();

  const [data, setData] = useState("");

  const search = (e) => {
    console.log("entered");
    dispatch(setSearchQuery(e.target.value));
    dispatch(listUsers());
  };
  return (
    <div className="min-h-screen p-5 bg-gray-100 ">
      <h1>Welcome to the Home Page</h1>
      <h1>{data}</h1>

      {userInfo?.isAdmin && (
        <div className="">
          <input
            placeholder="search"
            value={searchQuery}
            onChange={search}
            type="text"
            name=""
            id=""
          />
          <div className="flex items-center justify-center">
            {userList.length > 0 ? (
              <UsersList fn={setData} />
            ) : (
              <h3>No users found</h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
