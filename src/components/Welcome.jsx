import styles from "../styles/Welcome.module.css";
import Image from "next/image";
export default function About() {
  return (
    <main className={styles.welcomeMain}>
      <h1 className={styles.welcomeTitle}>Welcome to GFCC!</h1>
      <div className={styles.mainContent}>
        <div className={styles.textContainer}>
          <p>
            Operated since 2018,
            <strong> RMIT Golden Flames Competition Club (GFCC) </strong> brings
            together individuals with a great passion for{" "}
            <strong> character development, collaboration, </strong> and
            <strong> experiential learning </strong> through participating in
            university-level competitions. Our mission is to deliver a
            supportive and sharing playground for students to learn from each
            other, showcase their talents, apply their skills, and achieve
            educational and professional goals in life. Through resourceful
            workshops, mentorship, and materials, GFCC is here to help nurture
            your inner warrior and set the Flames in side you.
          </p>
        </div>
        <Image src="/HappyGFCC.png" alt="GFCC Logo" height={240} width={200} className={styles.logo}></Image>
      </div>
    </main>
  );
}
