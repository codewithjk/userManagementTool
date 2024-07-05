import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../features/users/usersActions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { reset } from "@/features/users/usersSlice";

const AdminCreateUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usersCreate = useSelector((state) => state.users);
  const { loading, error, success } = usersCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(name, email, password, isAdmin));
    if (success) {
      setName("");
      setEmail("");
      setPassword("");
      setIsAdmin(false);
      console.log("success");
      navigate("/");
      dispatch(reset());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card>
        <form onSubmit={submitHandler}>
          <CardHeader>
            <CardTitle>Create User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                defaultValue={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">email</Label>
              <Input
                type="email"
                id="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">password</Label>
              <Input
                type="password"
                id="password"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1  mt-5 flex items-center justify-start gap-3">
              <Label htmlFor="isAdmin">isAdmin</Label>
              <input
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
          </CardContent>
          <CardFooter>
            {loading && <div>Loading...</div>}
            {success && <div>User Created Successfully</div>}
            {error && <p className=" text-red-500 ">{error}</p>}
            <Button type="submit">Create user</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminCreateUserPage;
