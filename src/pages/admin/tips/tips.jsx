import { useEffect, useState } from "react";
import React from "react";
import style from "@/styles/table.module.css";
import Link from 'next/link';
import Popup from "reactjs-popup";
import Content from "@/components/Foldables/content";
import SearchBar from "@/components/Competitions/SearchBar";
const TipsTable = () => {
    const [tips, setTips] = useState([]);
    const [searchTerm, setSearchItem]= useState('');

    const handleSearchInput= (search)=>{
        setSearchItem(search);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/tip_api");
                if (response.ok) {
                    const data = await response.json();
                    setTips(data);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (tip) => {
        try {
            const response = await fetch(`/api/tip_api?id=${tip._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log("Tip delete successful");
                window.location.reload();
            } else {
                console.error('Failed to delete tip');
            }
        } catch (error) {
            console.error("Error deleting tip", error);
        }
    }

    const handleReturn = async () => {
        window.location.href = '/admin/dashboard/view';
    }

    const createButton = async () => {
        window.location.href = '/admin/tips/form';
    }

    const handleUpdate= async(tip)=>{
        console.log("ID to update "+ tip._id);
        window.location.href= `/admin/tips/form?id=${tip._id}`;
    }
    const filteredTips = tips && tips.data && tips.data.mongoData && tips.data.mongoData.filter((item) => {
        return item.tipName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return (
        <>
        <SearchBar showButton={true} placeholder="Search for tips" onChange={handleSearchInput}></SearchBar>
            <table className={style.mainTable}>
                <thead>
                    <tr>
                        <th>Tip name/ Topic</th>
                        <th>Link to tip on social media</th>
                        <th>Tip details</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTips && filteredTips.map((item, index) => (
                        <tr key={index}>
                            <td>{item.tipName}</td>
                            <td><Link href={item.tipsLink}>Link</Link></td>
                            <td>
                                {item.realContent && item.realContent.map((tip, index2) => (
                                    <Popup modal trigger={<button key={index2}>Tip {index2 +1}</button>}>
                                        {close => <Content close={close} className={style.modal} content={tip} />}
                                    </Popup>
                                    
                                ))}
                            </td>
                            <td>
                                <button onClick={() => handleUpdate(item)}>Update</button>
                                <button onClick={() => handleDelete(item)}>Delete</button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className={style.createButton} onClick={createButton}>Create</button>
            <button onClick={handleReturn}>Return</button>
        </>
    );
}

TipsTable.hideLayout = true;

export default TipsTable;
