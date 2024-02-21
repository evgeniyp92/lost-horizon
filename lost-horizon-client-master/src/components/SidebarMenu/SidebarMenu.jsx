import React from "react";
import ProfileWidget from "../ProfileWidget/ProfileWidget";
import MenuItemList from "../MenuItemList/MenuItemList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SidebarMenu = ({ userRole }) => {
  // set up the core menu items
  const menuItems = [
    { name: "Search", link: "/search" },
    { name: "Warehouse", link: "/inventory" },
    // { name: "ITEC", link: "/itec" },
    // { name: "DRMO", link: "/drmo" },
    // { name: "Orders", link: "/orders" },
  ];

  // if the user role is admin, add the admin menu items
  const makeMenuItems = () => {
    if (userRole === "admin") {
      const adminMenuItems = [
        ...menuItems,
        { name: "Add Inventory", link: "/admin" },
      ];
      return adminMenuItems;
    }
    return menuItems;
  };

  // create the full menu items list
  const menuItemsList = makeMenuItems();

  return (
    <div className='w-56 m-4 flex flex-col'>
      <div className='border rounded-md bg-slate-900 border-slate-700 my-1 grow shadow-inner+'>
        <Link to='/'>
          <h1 className='text-2xl w-56 text-center mt-4 text-white font-bold uppercase hover:text-cyan-300 transition'>
            Lost Horizon
          </h1>
        </Link>
        <MenuItemList items={menuItemsList} />
      </div>
      <ProfileWidget />
    </div>
  );
};

// mapping the current users role to userRole
const mapStateToProps = state => {
  return {
    userRole: state.currentUser.role,
  };
};

// redux connect statement with default export
export default connect(mapStateToProps, null)(SidebarMenu);
