import axios from "axios";
import React , { useState, useRef, useEffect } from "react";
import "./Account.css";

const Account = () => {
  const Session = sessionStorage.getItem("LoggedUser");
  const [UserData,setUserData]=useState(JSON.parse(Session))
  const {id,name,email,number,address,pic}=UserData

  const [edit,setEdit]=useState(false)

  useEffect(() => {
    axios.get("http://localhost:3004/users/"+id).then(res=>{
      sessionStorage.setItem("LoggedUser",JSON.stringify(res.data))
      setUserData(res.data)
    })
  }, [edit])
  

  // Ref Elements
  const refName=useRef();
  const refEmail=useRef();
  const refNumber=useRef();
  const refAddress=useRef();
  const dp=useRef();


  const editProfile=(e,ref)=>{
    e.target.style.display="none"
    e.target.nextSibling.style.display="block"
    ref.current.disabled=false

  }
  const saveProfile=(e,ref)=>{
    e.target.style.display="none"
    e.target.previousSibling.style.display="block"
    ref.current.disabled=true
    axios.put("http://localhost:3004/users/"+id,{...UserData,[ref.current.name]:ref.current.value})
    edit?setEdit(false):setEdit(true)
  }

  const profilePic=(e)=>{
    // console.log(e.target.files[0])
    const file=e.target.files[0]
    dp.current.src=window.URL.createObjectURL(file)
    
    var profilePic = new FormData();
    const fileExt=file.name.replace(/[\w\. ]+(?=[\.])/, '')
    profilePic.append("profilePic", file,id+"-profilePic"+fileExt);

    axios.post("http://localhost:8000/upload",profilePic).then(res=>console.log(res.data)).catch(e=>console.log(e))

    axios.put("http://localhost:3004/users/"+id,{...UserData,"pic":id+"-profilePic"+fileExt})
    edit?setEdit(false):setEdit(true)
  }

  return (
    <div>
    <div className="account">
      <div className="profile">
        <section>
          <label htmlFor="fileToUpload">
            <i className="fa fa-camera"></i>
            <input
              type="file"
              id="fileToUpload"
              style={{ visibility: "hidden" }}
              accept=".png,.jpg,jpeg,.PNG,.JPEG"
              name="fileToUpload"
              onChange={(e)=> profilePic(e)}
              // "document.getElementById('blah').src = window.URL.createObjectURL(this.files[0])"
            />
          </label>
          <img
            src={pic?"http://localhost:8000/dp/"+pic:"https://i.ibb.co/yNGW4gg/avatar.png"}
            id="blah"
            alt="Avatar"
            ref={dp}
            width={"250px"}
            height={"250px"}
          />
        </section>
        <h1>{name}</h1>
        <h3>Mern Developer</h3>
      </div>
      <div className="profile-detail">
        <ul>
          <li>
            <b>Full name</b>{" "}
            <input
              type="text"
              name="name"
              maxLength="100"
              defaultValue={name}
              required
              disabled
              ref={refName}
            />{" "}
            <i
              className="fa fa-edit"
              onClick={(e)=>editProfile(e,refName)}></i>
            <i
              className="fa fa-check"
              onClick={(e)=>saveProfile(e,refName)}></i>
          </li>
          <li>
            <b>Email</b>{" "}
            <input
              type="email"
              name="email"
              maxLength="150"
              value={email}
              required
              disabled
              ref={refEmail}
            />
          </li>
          <li>
            <b>Contact number</b>{" "}
            <input
              type="tel"
              name="number"
              maxLength="10"
              defaultValue={number}
              required
              disabled
              ref={refNumber}
            />{" "}
            <i
              className="fa fa-edit"
              onClick={(e)=>editProfile(e,refNumber)}></i>
            <i
              className="fa fa-check"
              onClick={(e)=>saveProfile(e,refNumber)}></i>
          </li>
          <li>
            <b>Address</b>{" "}
            <input
              type="text"
              name="address"
              maxLength="250"
              defaultValue={address}
              required
              disabled
              ref={refAddress}
            />{" "}
            <i
              className="fa fa-edit"
              onClick={(e)=>editProfile(e,refAddress)}></i>
            <i
              className="fa fa-check"
              onClick={(e)=>saveProfile(e,refAddress)}></i>
          </li>
        </ul>
      </div>
      
    </div>
    
      </div>
  );
};

export default Account;
