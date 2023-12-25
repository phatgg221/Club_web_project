// Cards.jsx
import React from "react";
import Card from "./Card";
// import "@/styles/Card.module.css"; // Import specific component styles

const Cards = () => {
  return (
    
    <div className="app">
      <h1 className= "header1">Ongoing Events</h1>
      <div className="card-container">
        <Card
          logo="/cat.jpg"
          organizer="RMIT University Vietnam"
          title="Sustainable Leadership in FMCG"
          description="HCMC 28/11/2023 - 31/12/2023"
          imageUrl="./landscape.jpg"
          linkUrl="www.google.com"
        />
        {/* Add more Card components as needed */}
        <Card
          logo="/cat.jpg"
          organizer="RMIT Univeristy Vietnam"
          title="PwC Hack-A-Day"
          description="HCMC 7/11/2023"
          imageUrl="https://www.pwchk.com/en/issues/cybersecurity-and-data-privacy/hack-a-day/2023/website-277x216-prize.png"
          linkUrl="https://www.pwc.com/vn/en/services/risk-assurance/cyber-security/hack-a-day.html"
        />
        {/* Add more Card components as needed */}
        <Card
          logo="/cat.jpg"
          organizer="RMIT University Vietnam"
          title="ASCIS - Cyberseciruty Competition"
          description="HCMC 7/10/2023 - 28/10/2023"
          imageUrl="https://www.vnisa.org.vn/wp-content/uploads/2023/12/Australia-Award-Fellowship-422x237.jpg"
          linkUrl="https://www.vnisa.org.vn/khoa-dao-tao-ngan-ve-an-toan-thong-tin-mang-cua-rmit/"
        />
      <div/>
      <div className="show-more-container">
      <a className="NutShowMore" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" >
          Show More
      </a>
      </div>
        <main className="main2">
        <h1 className="header2">More Event</h1>
        {/* Add more Card components as needed */}
        <div className="card-container2">
        <Card
          logo="/cat.jpg"
          organizer="RMIT University Vietnam"
          title="Google Summer of Code"
          description="HCMC 22/01/2024 - 11/11/2024"
          imageUrl="https://d.newsweek.com/en/full/1142783/cover-1.jpg"
          linkUrl="https://summerofcode.withgoogle.com/"
        />
        {/* Add more Card components as needed */}
        <Card
          logo="/cat.jpg"
          organizer="RMIT University Vietnam"
          title="Acknowledgement of Country"
          description="HCMC 1/12/2023 - 1/2/2024"
          imageUrl="https://www.rmit.edu.au/content/dam/rmit/rmit-images/news/2020/may/lou-bloomer-indigenous-artwork/LouBloomer-1220x738px.jpg"
          linkUrl="https://www.rmit.edu.au/about/our-values/respect-for-australian-indigenous-cultures"
        />
        {/* Add more Card components as needed */}
        <Card
          logo="/cat.jpg"
          organizer="RMIT University Vietnam"
          title="What foods are the most nutritious? THis is used to test whether the card will overflow or not."
          description="HCMC 17/12/2023 - 1/1/2024"
          imageUrl="https://www.alldaychemist.com/blog/wp-content/uploads/2017/04/shutterstock_437304349-1.jpg"
          linkUrl="https://app.datacamp.com/learn/competitions/nutrition-fact-check"
        />
        {/* Add more Card components as needed */}
      </div>
      <div className="show-more-container">
      <a className="NutShowMore" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Show More</a>
      </div>
     
      </main>
      </div>
    </div>
  );
};

export default Cards;