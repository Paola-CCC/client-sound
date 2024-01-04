import React  from "react";
// import { useNavigate } from "react-router-dom";
import "./SidebarConversation.scss";
// import { AuthContext } from "../../contexts/AuthContextProvider";

const SidebarConversation = ({ allUsers }) => {
  // const { userId, setUserId } = useContext(AuthContext);

  // let navigate = useNavigate();
  // const handleClick = (e) => {
  //   navigate(`/user/${e}`) ;
  // }

  return (
      <ul className="username-only">
        {/* {allUsers.users.map((user, id) => (
            <li key={id} onClick={() => handleClick(userId)} >
              <p>{user.username}</p>
            </li>
        ))} */}
            <li>
              <span>Lucas</span>
            </li>
            <li>
              <span>Emma</span>
            </li>
            <li>
              <span>Liam</span>
            </li>
            <li>
              <span>Léa</span>
            </li>
            <li>
              <span>Hugo</span>
            </li>
            <li>
              <span>Jade</span>
            </li>
            <li>
              <span>Arthur</span>
            </li>
            <li>
              <span>Alice</span>
            </li>
            <li>
              <span>Nathan</span>
            </li>
            <li>
              <span>Manon</span>
            </li>
            <li>
              <span>Hugo</span>
            </li>
            <li>
              <span>Jade</span>
            </li>
            <li>
              <span>Arthur</span>
            </li>
            <li>
              <span>Alice</span>
            </li>
            <li>
              <span>Nathan</span>
            </li>
            <li>
              <span>Manon</span>
            </li>
      </ul>
  );
};

export default SidebarConversation;
