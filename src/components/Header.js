import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import vedo from "../assets/imags/img/vedo.png";

import dobel from "../assets/imags/img/dobel.png";

import menu from "../assets/imags/img/menu.png";

import user from "../assets/imags/img/user.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="h-20 fixed w-full bg-slate-200 flex justify-between p-4 items-center">
      <div className="flex  gap-8 p-6 z-auto">
        <img src={vedo} />
        <h1>Arbit Blog</h1>
      </div>

      <nav>
        <div className="absolute right-6 md:hidden top-6 scale-150"></div>

        <ul className="flex gap-8 p-6 ">
          <li>
            <Link to="/">Posts</Link>
          </li>

          <img src={dobel} />

          <img src={menu} onClick={() => navigate("/add-post")} />
          <img src={user} style={{ width: "40px" }} />
        </ul>
      </nav>
    </div>
  );
};

export default Header;
