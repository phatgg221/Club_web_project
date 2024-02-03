import React from "react";
import AdminHeader from "@/components/Header/adminHeader";

function Dashboard(){
    const handleCardButton= async()=>{
        window.location.href= '/admin/Card/view';
    }

    const handleChampButton= async()=>{
        window.location.href= '/admin/champions/view';
    }
    const handleSample= async() =>{
        window.location.href= '/admin/sample/view';
    }
    const hanldeMember= async() =>{
        window.location.href= '/admin/member/view';
    }
    return(
        <div>
            <AdminHeader/>
            <div>
                <button onClick={handleCardButton}>Mange Card</button>
                <button onClick={handleChampButton}>Manage Champion</button>
                <button onClick={hanldeMember}>Manage Member</button>
                <button onClick={handleSample}>Manage Sample</button>
                <button>Manage Tips</button>
            </div>
        </div>
    )
}
Dashboard.hideLayout= true;
export default Dashboard;