import { LogoutRounded } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/image/logo.ico";
import { updateDoc, doc, collection, deleteDoc,onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { AuthContext } from "../../contexts/auth";
import { signOut } from "firebase/auth";
import { lightBlue } from "@mui/material/colors";

const Navbar = () => {
  const navigate = useNavigate();
  const curr_user=auth.currentUser?.uid;
  const [msgs,setMsgs]=useState([]);
  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser?.uid), {
      isOnline: false,
    });
    if(curr_user){
      const chatCollectionRef=collection(db,'messages',curr_user,'chats');
      let messages=[];
    onSnapshot(chatCollectionRef,(snap)=>{
      snap.forEach((doc)=>{
        messages.push({...doc.data(),id: doc.id});
      })
      setMsgs(messages);
      // console.log(messages,'messages');
      // console.log(messages,'cm')
      console.log(messages[0],messages[0]?.id)
  messages.forEach((msg)=>{
    console.log(111111);
    const handleDel=async()=>{
      const chatDocRef=doc(db,'messages',curr_user,'chats',msg.id);
      await deleteDoc(chatDocRef);
      }
    handleDel();
  })
  })
  
  
  
    
  }
    signOut(auth);
    navigate("/login");
  };
  // useEffect(()=>{
  //   console.log(msgs,'cm');
  // },[msgs])

  const user = useContext(AuthContext);
  console.log("NavBar.jsx", user);

  return (
    <div className="grid grid-cols-4 gap-5 justify-evenly align-middle place-items-stretch pl-10 bg-green-100">
      {/* LOGO: goto Home */}
      <div className="block">
        <Link to="/">
          <img src={logo} alt="Feeltivity logo" />
        </Link>
      </div>

      
      {/* Empty so it takes up space*/}
      <div className="hidden sm:block"></div>

      {/* ChatPage, AboutUs */}
      <div className="grid grid-cols-3 place-items-center">
        <Link to="/chatpage">
          <div className="hover:bg-[#edfdfd] hover:text-[#40a3b6] font-[500] px-2 py-2 rounded-lg">
            ChatPage
          </div>
        </Link>
        <Link to="/aboutus">
          <div className="hover:bg-[#edfdfd] hover:text-[#40a3b6] font-[500] px-2 py-2 rounded-lg">
            AboutUs
          </div>
        </Link>
        <Link to={"/contactus"}>
          <div className="hover:bg-[#edfdfd] hover:text-[#40a3b6] font-[500] px-2 py-2 rounded-lg">
            ContactUs
          </div>
        </Link>
      </div>

      {/* Logout */}
      <div className="grid grid-cols-2 place-items-center">
        <Link to="/login">
          <Button
            variant="outlined"
            endIcon={<LogoutRounded />}
            sx={{ borderRadius: 2 }}
            onClick={handleSignout}
          >
            Logout
          </Button>
        </Link>

        <Avatar
          sx={{ bgcolor: lightBlue[500] }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          B
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;