import { useEffect, useState } from "react";
import React from "react";


const CardTable= () =>{
    const [ongoingCompetitions, setOngoingCompetitions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for ongoing competitions
        const competitionsResponse = await fetch('/api/card_api');
        const competitionsData = await competitionsResponse.json();
        // console.log("CompetitionResponse:", competitionsResponse);
        // console.log("CompetitionData:", competitionsData);
        setOngoingCompetitions(competitionsData);
        // setOngoingCompetitions(competitionsData);

        // const eventsResponse = await fetch('/api/ongoing_events');
        // const eventsData = await eventsResponse.json();
        // console.log("EventsResponse:", eventsResponse);
        // console.log("EventsData:", eventsData);
  
        // Uncomment the next two lines if you want to set the data in state
        // setOngoingEvents(eventsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
if ('data' in ongoingCompetitions && 'mongoData' in ongoingCompetitions.data && ongoingCompetitions.data.mongoData.length > 0) {
    console.log("Organizer: ", ongoingCompetitions.data.mongoData[0].organizer);
   } else {
    console.log("No organizer found.");
   }
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
                    <th>Competition name</th>
                    <th>Location</th>
                    <th>Link to web</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {ongoingCompetitions.data.mongoData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.organizer}</td>
                        <td>{item.competitionName}</td>
                        <td>{item.location}</td>
                        <td><a href={item.linkToWeb}>Link</a></td>
                        <td><img src={item.image} alt="" /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
    
}



export default CardTable;