import React from "react";

const Loading = ({ show }) => {
  const LoadingModal = {
    position: "fixed",
    top: 0,
    marginLeft: "-25px",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "100",
    backgroundColor: "rgb(0,0,0,0.5)",
  };
  const LoadingDiv = {
    padding: "20px",
    width: "100px",
    height: "100px",
    background: "url('Assets/load.gif') no-repeat center center / cover",
  };
  return (
    <div
      className="loading-modal"
      style={{ ...LoadingModal, display: `${show}` }}
    >
      <div className="loading-div" style={LoadingDiv}></div>
    </div>
  );
};

export default Loading;
