import React from "react";

/**
 * Content Pane is a component that is used to provide a solid backdrop content
 * in the right 3/4s of the screen
 *
 * @param {*} { children, disablePadding, disableBackdrop }
 * @return {*}
 */
const ContentPane = ({ children, disablePadding, disableBackdrop }) => {
  return (
    // <div className="border rounded-md h-full p-4 flex flex-col items-center bg-slate-900 border-slate-700">
    <div
      className={`h-full p-${
        disablePadding ? "0" : "4"
      } flex flex-col items-center ${
        disableBackdrop ? "" : "bg-slate-900 border rounded-md border-slate-700"
      }`}
    >
      {children}
    </div>
  );
};

export default ContentPane;
