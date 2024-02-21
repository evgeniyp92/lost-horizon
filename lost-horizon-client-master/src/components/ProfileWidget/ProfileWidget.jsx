import React, { useEffect } from "react";
import RaptorImage from "../../assets/Raptor.jpg";
import Cookies from "js-cookie";

import { getUserInformation } from "../../actions";
import { connect } from "react-redux";

// helper function to remove the cookie and forcefully navigate away
const handleLogout = () => {
  Cookies.remove("jwt");
  // TODO: replace this with useNavigate
  window.location.href = "/";
};

const ProfileWidget = ({ getUserInformation, userProfile }) => {
  // get the cookie
  const token = Cookies.get("jwt");

  // get the user information on render, and whenever token or function change
  useEffect(() => {
    const handleUserFetch = async () => {
      await getUserInformation(token);
    };
    handleUserFetch();
  }, [getUserInformation, token]);

  return (
    <div className="flex flex-col justify-evenly items-center border rounded-md bg-slate-900 border-slate-700 p-4 my-1 shadow-inner+">
      <div className="flex w-full h-auto">
        <img
          src={RaptorImage}
          alt="User's profile"
          className="w-12 h-12 rounded-full border-2 border-slate-600"
        />
        <div className="flex flex-col items-end justify-center w-full">
          <p className="text-sm">
            {userProfile.rank} {userProfile.lastName}
          </p>
          <p className="text-sm font-bold">{userProfile.role?.toUpperCase()}</p>
        </div>
      </div>
      <hr className="h-1 w-11/12 border-2 rounded-full border-green-400 my-4" />
      <div className="flex justify-evenly items-center w-full">
        {/* <button
          className="h-8 w-5/12 border rounded-md text-center transition
				 uppercase text-xs border-cyan-500 bg-cyan-300 hover:bg-cyan-400
				  text-black font-bold"
        >
          <p>Profile</p>
        </button> */}
        <button
          className="h-8 w-5/12 border rounded-md text-center transition 
					uppercase text-xs border-cyan-500 bg-cyan-300 hover:bg-cyan-400
					 text-black font-bold"
          onClick={handleLogout}
        >
          <p>Log Out</p>
        </button>
      </div>
    </div>
  );
};

// mapping the currentUser to userProfile
const mapStateToProps = (state) => {
  return {
    userProfile: state.currentUser,
  };
};

// redux connect statement with default export
export default connect(mapStateToProps, { getUserInformation })(ProfileWidget);
