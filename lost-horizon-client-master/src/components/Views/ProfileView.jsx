import React from "react";
import { connect } from "react-redux";

const ProfileView = ({ userProfile }) => {
  return (
    <React.Fragment>
      <div className="mb-2">
        <h2 className="font-light text-5xl text-center mb-2">
          Welcome, {userProfile.rank} {userProfile.lastName}
        </h2>
        {/* <p className="text-center">
          Last login: {`${new Date(Date.now() - 8640000).toLocaleString()}`}
        </p> */}
      </div>
      {/* <div>
        <p className="text-center">Stats go here</p>
        <p className="text-center">Waow cool stats</p>
      </div> */}
      <div>
        <p className="text-center">Click on a tab on the left to begin...</p>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userProfile: state.currentUser,
  };
};

export default connect(mapStateToProps)(ProfileView);
