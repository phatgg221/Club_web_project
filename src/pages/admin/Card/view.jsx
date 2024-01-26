import { useEffect, useState } from "react";
import React from "react";


const CardTable= () =>{
    const [cardTable, setCardTable]= useState([]);
    useEffect(() =>{
        const fetchData= async() =>{
            try{
                const data= await fetch('api/card_api');
                const realData= await data.json();
                setCardTable(realData);
            }catch(error){
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);

// let cards=[];
// if(cardTable.data && cardTable.data.mongoData){
//     for(let i=0; i< cardTable.length; i++){
//         let item = cardTable
//         cards.push(
            
//         )
//     }
// }

    return (
        <table>
            <thead>
                <tr>
                    <th>Organizer</th>
                    <th>Compitition name</th>
                    <th>Location</th>
                    <th>Link to web</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {cardTable.map((item, index) => (
                    <tr key={index}>
                    <td>{item.data.organizer}</td>
                    <td>{item.data.mongoData.competitionName}</td>
                    <td>{item.data.location}</td>
                    <td><a href={item.data.linkToWeb}>Link</a></td>
                    <td><img src={item.data.image} alt="" /></td>
                </tr>
                ))}
            </tbody>
        </table>
    );
    
}



export default CardTable;