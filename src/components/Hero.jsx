import styles from "@/styles/Hero.module.css"

function Hero() {
  function competition(){
    document.location="/competitions";
  }
  function prepare(){
    console.log("Prepare");
  }
  function Booking(){
    console.log("Book");
  }
 return (
  <main className={styles.main}>
   <div className={styles.hero}>
     <div className={styles['hero-text']}>
       <title className={styles['GreetingTile']}>Greetings, User!</title>
       <tri className={styles['PageContent']}>
         Welcome to the largest (probably) competition database in Vietnam.
       </tri>
       <div className={styles['button-container']}>
         <button onClick={competition} className={styles.button1}>Explore Competition</button>
         <button className={styles.button2}>Prepare for Competition</button>
         <button className={styles.button3}>Book a counter-pitching session</button>
       </div>
     </div>
     <div className={styles.image}>
     <img className={styles.imageContent} src="/Mascott.png" alt="GFCC Logo"></img>
     </div>
   </div>
   </main>
 );
}

export default Hero;
