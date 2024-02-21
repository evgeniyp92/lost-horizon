import React from "react";
import { Link } from "react-router-dom";

/**
 * Helper component to render the items in the left 1/4 menu
 * @param {*} NavMenuItems
 * @returns
 */
const renderNavMenuItems = (NavMenuItems) => {
  return NavMenuItems.map((item) => (
    <Link to={item.link} key={item.name}>
      <li className="h-10 border rounded-md my-1 border-cyan-700 bg-cyan-300 hover:bg-cyan-400 shadow-md hover:shadow-lg cursor-pointer transition font-semibold uppercase text-sm text-black flex items-center justify-center">
        {item.name}
      </li>
    </Link>
  ));
};

const MenuItemList = (props) => (
  <ul className="w-full p-4 flex flex-col">
    {renderNavMenuItems(props.items)}
  </ul>
);

export default MenuItemList;
