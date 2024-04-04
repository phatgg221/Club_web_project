// Cards.jsx
import React from "react";
import Card from "./Card";
import { useEffect, useState } from "react";
import Link from "next/link";
// import "@/styles/Card.module.css"; // Import specific component styles


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       // Fetch data for ongoing competitions
//       const competitionsResponse = await fetch('/api/card_api');
//       const competitionsData = await competitionsResponse.json();
//       setOngoingCompetitions(competitionsData);

//       // Fetch data for ongoing events
//       const eventsResponse = await fetch('/api/ongoing_events');
//       const eventsData = await eventsResponse.json();
//       setOngoingEvents(eventsData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchData();
// }, []);
// console.log(fetchData);
const Cards = () => {
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
  
  // if ('data' in ongoingCompetitions && 'mongoData' in ongoingCompetitions.data && ongoingCompetitions.data.mongoData.length > 0) {
  //   console.log("Organizer: ", ongoingCompetitions.data.mongoData[0].organizer);
  //  } else {
  //   console.log("No organizer found.");
  //  }
   

  
  let cards1 = [];
if (ongoingCompetitions.data && ongoingCompetitions.data.mongoData) {
  // Get the minimum of  3 or the actual length of the array
  const limit = Math.min(3, ongoingCompetitions.data.mongoData.length);
  for (let i =  0; i < limit; i++) {
    let item = ongoingCompetitions.data.mongoData[i];
    cards1.push(
      <Card
        logoURL="/RMIT-logo.png"
        organizer={item.organizer}
        title={item.competitionName}
        description={item.description}
        imageUrl={item.imageURL}
        linkUrl={item.linkToWeb}
      />
    );
  }
}

  let cards2= [];
  if(ongoingCompetitions.data && ongoingCompetitions.data.mongoData){
    for(let i=ongoingCompetitions.data.mongoData.length-3; i<= ongoingCompetitions.data.mongoData.length-1; i++){
      let item2 = ongoingCompetitions.data.mongoData[i];

      cards2.push(
        <Card
        logoURL="/RMIT-logo.png"
        organizer={item2.organizer}
        title={item2.competitionName}
        description={item2.description}
        imageUrl={item2.imageURL}
        linkUrl={item2.linkToWeb}
        />
      )
    }
  }


  return (
    <div className="app">
      <div className="competition-section">
        <h1 className="competition-header">Ongoing Competitions</h1>
        <div className="card-container">
          {cards1}
        </div>
        <div className="show-more-container">
          <Link
            className="NutShowMore"
            href="/competitions"
          >
            Show More
          </Link>
        </div>
      </div>
      <div className="event-section">
        <h1 className="event-header">Ongoing Events</h1>
        <div className="card-container">
          {cards2}
          {/* Add more Card components as needed */}
        </div>
        <div className="show-more-container">
          <Link
            className="NutShowMore"
            href="/competitions"
          >
            Show More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
