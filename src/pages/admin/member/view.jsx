import {useEffect, useState} from "react";
import React from "react";
import style from "@/styles/table.module.css";
import Popup from 'reactjs-popup';

const MemberTable =() =>{
    const [members, setMembers] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData]= useState({
        username: '',
        password: '1'
    })
    const closeModal= () => setOpen(false);
    const openModal= () => setOpen(true);
    useEffect(() =>{
        const fetchData = async () => {
            try{
                const response = await fetch(`/api/member_api`);
                const data= await response.json();
                setMembers(data);

            }catch(error){
                console.log('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange= (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    const handleDelete= async(id)=>{
        try{
            // console.log("akjsdna member id : " + member._id)
            const response = await fetch(`/api/member_api?=${id}`,{
                method: 'DELETE',
            });

            if(response.ok){
                console.log("Member delete successful");
                window.location.reload();
            }else{
                console.error('Failed to delete member');
            }
        }catch (error){
            console.error("Error deleting member", error);
        }
    }

    const handleReturn = async() => {
        window.location.href= '/admin/dashboard/view';
    }

    const hanldeSubmit= async(event) =>{
        event.preventDefault();

        fetch('/api/member_api',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response =>{
            if(!response.ok){
                throw new Error ('Network reponse was not ok');
            }

            closeModal();

            return response.json();
        })
        .then(data=> console.log('Success: ', data))
        .catch(error => console.error('Error', error));
    };

    return (
        <>
            <Popup open={open} closeOnDocumentClick onClose={hanldeSubmit}>
                <form onSubmit={hanldeSubmit}>
                    <label>
                        Username:
                        <input name ="username" required = {true} type= "text" onChange={handleInputChange}></input>
                    </label>
                    <label>
                        Password: The password will be 1 as default. Member can change it later.
                    </label>
                    <button type="submit">Create Account</button>
                </form>

            </Popup>
            <table className={style.mainTable}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {members && members.data && members.data.mongoData && members.data.mongoData.map((item, index) =>(
                        <tr key={index}>
                            <td>{item.username}</td>
                            <td>{item.password}</td>
                            <td><button onClick={() => handleDelete(item._id)}>Delete</button></td>
                        </tr>

                    ))}
                </tbody>
            </table>
            <button onClick={openModal}>Create a new account</button>
            <button onClick={handleReturn}>Return to dashboard</button>
        </>
    );
}


MemberTable.hideLayout= true;
export default MemberTable;