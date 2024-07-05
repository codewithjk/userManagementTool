import { deleteUserProfile, listUsers } from "@/features/users/usersActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Card } from "./ui/card";
import { setEditUser } from "@/features/users/usersSlice";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function UsersList({ fn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setPage] = useState(1);
  const users = useSelector((state) => state.users);
  const { userList, loading, error, totalPages } = users;
  useEffect(() => {
    dispatch(listUsers(currentPage));
  }, [dispatch, currentPage]);

  const editUser = (user) => {
    dispatch(setEditUser(user));
    navigate("/update");
  };
  const deleteUser = (user) => {
    console.log(user);
    dispatch(deleteUserProfile(user));
  };

  const updateValue = (e) => {
    fn(e.target.value);
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-yellow-200">
    <Card>
      <input onChange={updateValue} type="text" />
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {userList.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback>IMG</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className=" sm:flex sm:flex-col  md:flex md:flex-row  gap-2 ">
                <Button onClick={() => editUser(user)}>Edit</Button>
                <Button onClick={() => deleteUser(user)} variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="flex justify-center">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage(currentPage - 1)}
                  />
                </PaginationItem>
              )}
              <PaginationItem>
                {currentPage} of {totalPages}
              </PaginationItem>
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => setPage(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </TableFooter>
      </Table>
    </Card>
  );
}

export default UsersList;
