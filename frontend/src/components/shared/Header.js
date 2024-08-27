import React from "react";
import { Icon } from "@iconify/react";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="navbar w-full h-1/10 bg-gradient-to-b from-black z-10 flex items-center justify-between px-4 text-white">
      {/* Hamburger icon (visible on medium screens and smaller) */}
      <div className="md:block lg:hidden">
        <Icon
          icon="material-symbols:menu"
          className="text-3xl cursor-pointer"
          onClick={toggleSidebar} // Call a function to toggle the sidebar when clicked
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center w-full">
        Music App
      </h1>

      {/* Placeholder div to balance the flex layout when hamburger is visible */}
      <div className="md:block lg:hidden" style={{ width: "1.5rem" }}></div>
    </div>
  );
};

export default Header;
