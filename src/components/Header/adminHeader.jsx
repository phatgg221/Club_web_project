import React from "react";



function AdminHeader(){
    const Hstyle= {
        display: 'inline',
        marginRight: '10px'
    }
    const buttonStyle={
        display: 'inline',
        marginLeft: '900px',
        marginBottom: '100px'
    }
    const handleButton= async () =>{ 
        window.location.href= "/";
    }
    return (
        <div>
            <h1 style = {Hstyle}>Welcome, admin</h1>
            <button onClick= {handleButton} style={buttonStyle}>Logout</button>
        </div>
    );
}

export default AdminHeader;