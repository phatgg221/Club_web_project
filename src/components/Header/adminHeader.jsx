import React from "react";

function AdminHeader() {
  const headerStyle = {
    marginBottom: "1rem",
    backgroundColor: "#f4f4f4",
    padding: "1rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
  };

  const Hstyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const textStyle = {
    //advoid it has the margin bottom from the reboot.css
    marginBottom: "0",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    marginLeft: "0.5rem",
    borderRadius: "0.35rem",
    display: "inline-flex",
    alignItems: "center",
  };
  const handleButton = async () => {
    window.location.href = "/";
  };
  return (
    <header style={headerStyle}>
      <div style={Hstyle}>
        <h3 style={textStyle}>Admin Dashboard</h3>
        <button onClick={handleButton} style={buttonStyle}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
