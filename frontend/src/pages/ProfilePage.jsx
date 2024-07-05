import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateSelfProfile,
} from "../features/auth/authActions";
import { useNavigate } from "react-router-dom";
import { updateSelfProfileSuccess } from "../features/auth/authSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateUserProfile } from "../features/users/usersActions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const ProfilePage = ({ update }) => {
  const auth = useSelector((state) => state.auth);
  const { loading, error, userInfo } = auth;
  const users = useSelector((state) => state.users);
  const { edituser, success } = users;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (storedUserInfo) {
        dispatch(updateSelfProfileSuccess(storedUserInfo));
      } else {
        navigate("/login");
      }
    } else {
      if (!userInfo.name) {
        dispatch(getUserDetails("profile"));
      }
      setName((update && edituser?.name) || userInfo.name);
      setEmail((update && edituser?.email) || userInfo.email);
      setImagePreview(
        (update && edituser?.profileImage) || userInfo.profileImage
      );
    }
  }, [dispatch, navigate, userInfo, edituser, update]);

  const updateProfile = () => {
    const addImage = imagePreview.startsWith("blob:http://localhost");
    dispatch(
      updateSelfProfile({
        id: userInfo._id,
        name,
        email,
        image: addImage ? profileImage : userInfo.profileImage,
      })
    );
  };

  const updateUser = () => {
    const addImage = imagePreview.startsWith("blob:http://localhost");
    dispatch(
      updateUserProfile({
        id: edituser._id,
        name,
        email,
        image: addImage ? profileImage : edituser.profileImage,
      })
    );
    if (success) {
      navigate("/");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setProfileImage(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {message && <div>{message}</div>}
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>{update ? "Update User" : "Account"}</CardTitle>
              <CardDescription>
                {update
                  ? "Make changes to user data here. Click save when you're done."
                  : "Make changes to your account here. Click save when you're done."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1 flex justify-center">
                <Label htmlFor="image">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={imagePreview} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              {update ? (
                <Button onClick={updateUser}>Update</Button>
              ) : (
                <Button onClick={updateProfile}>Save changes</Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        {/* Uncomment this section to enable password change functionality */}
        {/* <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default ProfilePage;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getUserDetails,
//   updateSelfProfile,
// } from "../features/auth/authActions";
// import { useNavigate } from "react-router-dom";
// import { updateSelfProfileSuccess } from "../features/auth/authSlice";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { updateUserProfile } from "../features/users/usersActions";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { AvatarFallback } from "@radix-ui/react-avatar";

// const ProfilePage = ({ update }) => {
//   console.log("updaye", update);
//   const auth = useSelector((state) => state.auth);
//   const { loading, error, userInfo } = auth;
//   const users = useSelector((state) => state.users);
//   const { edituser, success } = users;

//   const [name, setName] = useState((update && edituser.name) || userInfo.name);
//   const [email, setEmail] = useState(
//     (update && edituser.email) || userInfo.email
//   );
//   const [profileImage, setProfileImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(
//     (update && edituser.profileImage) || userInfo.profileImage
//   );
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!userInfo) {
//       const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (storedUserInfo) {
//         console.log(storedUserInfo);

//         dispatch(updateSelfProfileSuccess(storedUserInfo));
//       } else {
//         navigate("/login");
//       }
//     } else {
//       if (!userInfo.name) {
//         dispatch(getUserDetails("profile"));
//       }
//     }
//   }, [dispatch, navigate, userInfo]);

//   const updateProfile = () => {
//     const addImage = imagePreview.startsWith("blob:http://localhost");
//     dispatch(
//       updateSelfProfile({
//         id: userInfo._id,
//         name,
//         email,
//         image: addImage && profileImage,
//       })
//     );
//   };

//   const updateUser = () => {
//     let addImage = imagePreview.startsWith("blob:http://localhost");
//     dispatch(
//       updateUserProfile({
//         id: edituser._id,
//         name,
//         email,
//         image: addImage && profileImage,
//       })
//     );
//     if (success) {
//       navigate("/");
//     }
//   };
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImagePreview(url);
//       setProfileImage(file);
//     }
//   };

//   console.log(profileImage);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       {message && <div>{message}</div>}
//       {error && <div>{error}</div>}
//       {loading && <div>Loading...</div>}

//       <Tabs defaultValue="account" className="w-[400px]">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="account">Account</TabsTrigger>
//           <TabsTrigger value="password">Password</TabsTrigger>
//         </TabsList>
//         <TabsContent value="account">
//           <Card>
//             {update ? (
//               <CardHeader>
//                 <CardTitle>Update user</CardTitle>
//                 <CardDescription>
//                   Make changes to user data here. Click save when you're done.
//                 </CardDescription>
//               </CardHeader>
//             ) : (
//               <CardHeader>
//                 <CardTitle>Account</CardTitle>
//                 <CardDescription>
//                   Make changes to your account here. Click save when you're
//                   done.
//                 </CardDescription>
//               </CardHeader>
//             )}

//             <CardContent className="space-y-2">
//               <div className="space-y-1 flex justify-center ">
//                 <Label htmlFor="image">
//                   <Avatar className="w-20 h-20">
//                     <AvatarImage src={imagePreview} />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                 </Label>
//                 <input
//                   id="image"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   hidden
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   id="name"
//                   defaultValue={name}
//                   type="text"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="email">email</Label>
//                 <Input
//                   type="email"
//                   id="email"
//                   defaultValue={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               {update ? (
//                 <Button onClick={updateUser}>Update</Button>
//               ) : (
//                 <Button onClick={updateProfile}>Save changes</Button>
//               )}
//             </CardFooter>
//           </Card>
//         </TabsContent>
//         {/* <TabsContent value="password">
//           <Card>
//             <CardHeader>
//               <CardTitle>Password</CardTitle>
//               <CardDescription>
//                 Change your password here. After saving, you'll be logged out.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="space-y-1">
//                 <Label htmlFor="current">Current password</Label>
//                 <Input id="current" type="password" />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="new">New password</Label>
//                 <Input id="new" type="password" />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button>Save password</Button>
//             </CardFooter>
//           </Card>
//         </TabsContent> */}
//       </Tabs>
//     </div>
//   );
// };
// export default ProfilePage;
