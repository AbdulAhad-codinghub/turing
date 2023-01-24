import React from "react";
import "./Header.css";
import TT from "../../assets/images/TT.png";

export const Header = () => {
  return (
    <div className="header">
      <div className="headerLogo">
        <img src={TT} alt="" />
      </div>
      <div className="logoutBtn">Logout</div>
    </div>
  );
};
