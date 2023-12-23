import styles from "@/styles/Hero.module.css"

function Hero() {
 return (
  <main className={styles.main}>
   <div className={styles.hero}>
     <div className={styles['hero-text']}>
       <h1 className={styles['GreetingTile']}>Greetings, User!</h1>
       <p className={styles['PageContent']}>
         Welcome to the largest (probably) competition database in Vietnam.
       </p>
       <div className={styles['button-container']}>
         <button className={styles.button1}>Explore Competition</button>
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
