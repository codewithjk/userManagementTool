import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authActions";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className=" p-2 ">
      <nav>
        <ul className="flex flex-row justify-end gap-x-5 bg-secondary p-2">
          <li>
            <Link to="/">
              <Button variant="link">Home</Button>
            </Link>
          </li>
          {userInfo ? (
            <>
              <li>
                <Link to="/profile">
                  <Avatar>
                    <AvatarImage
                      src={
                        userInfo.profileImage || `https://github.com/shadcn.png`
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
              </li>
              {userInfo.isAdmin && (
                <li>
                  <Link to="/admin/createuser">Admin</Link>
                </li>
              )}
              <li>
                <Button onClick={logoutHandler} variant="destructive">
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <div className="flex flex-row-reverse gap-x-1">
              <li>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <Button variant="outline">Register</Button>
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
