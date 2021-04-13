import React from "react";

export const Logout = () => {
  localStorage.removeItem("token");//rucno brisanje tokena pri odjavi

  return (window.location.href = "/");
};
export default Logout;