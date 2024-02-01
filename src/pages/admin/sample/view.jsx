import { useEffect, useState } from "react";
import React from "react";
import style from "@/styles/table.module.css";


const SampleTable= () => {
    const [ongoingCompetitions, setOngoingCompetitions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const competitionsResponse = await fetch('/api/sample_api');
                const competitionsData = await competitionsResponse.json();
                console.log("aklsdjalskdja" + JSON.stringify(competitionsData.data));
                setOngoingCompetitions(competitionsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete= async(sample)=>{
        // console.log("sample id "+ sample._id)
        try{
            const response = await fetch(`/api/sample_api?id=${sample._id}`,{
                method: 'DELETE',
            });

            if(response.ok){
                console.log("Sample delete successful");
                window.location.reload();
            }else{
                console.error('Failed to delete sample');
            }
        }catch(error){
            console.error("Error deleting sample", error);
        }
    }

    const handleCreateButton = async () => {
        window.location.href = '/admin/sample/form';
    };
    
    const handleUpdateButton = async (id) => {
        console.log("ID to update "+ id);
        window.location.href = `/admin/sample/form?id=${id}`;
    };
    
    return (
        <>
            <table className={style.mainTable}>
                <thead>
                    <tr>
                        <th>Sample Name</th>
                        <th>Contents/ Topics</th>
                        <th>Author</th>
                        <th>Sample link</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ongoingCompetitions && ongoingCompetitions.data && ongoingCompetitions.data.mongoData && ongoingCompetitions.data.mongoData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.sampleName}</td>
                            <td>{item.sampleContents}</td>
                            <td>{item.sampleAuthor}</td>
                            <td><a href={item.sampleLink}>Link</a></td>
                            <td><button onClick={() => handleUpdateButton(item._id)}>Update</button><button onClick={() => handleDelete(item)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className={style.createButton} onClick={handleCreateButton}>Create</button>
        </>
    );
}

export default SampleTable;