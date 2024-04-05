import styles from "../styles/Hero.module.css";
import Link from "next/link";
import Image from "next/image";
function Hero() {
  function competition() {
    document.location = "/competitions";
  }
  function prepare() {
    document.location = "/samples";
  }
  function booking() {
    document.location = "/booking";
  }

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles["hero-text"]}>
          <h1 className={styles["GreetingTile"]}>
            Greetings,{" "}
            <Link href="/profile" className={styles.link}>
              User!
            </Link>
          </h1>
          <p className={styles["PageContent"]}>
            Welcome to the largest (probably) competition database in Vietnam.
          </p>
          <div className={styles["button-container"]}>
            <button onClick={competition} className={styles.button1}>
              Explore Competition
            </button>
            <button onClick={prepare} className={styles.button2}>
              Prepare for Competition
            </button>
            <button onClick={booking} className={styles.button3}>
              Book a counter-pitching session
            </button>
          </div>
        </div>
        <div className={styles.image}>
          <Image
            className={styles.imageContent}
            src="/Mascot.png"
            alt="GFCC Logo"
            width={230}
            height={500}
          ></Image>
        </div>
      </div>
    </main>
  );
}

export default Hero;
