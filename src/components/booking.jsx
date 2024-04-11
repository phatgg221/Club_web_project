import styles from "../styles/Booking.module.css";

export default function Booking() {
  return (
    <div className={styles.mainContent}>
      <h1>Book a Session</h1>
      <p>Leave your information here and we will reach out to you ASAP.</p>
      <div className={styles.box}>
        <iframe
          className={styles.iframe}
          src="https://docs.google.com/forms/d/e/1FAIpQLSfvFI9Moyn1RM6EQHmm9dLy_o67J5Js0SCjKn-LQmDRkUkdlQ/viewform?embedded=true"
          width="900"
          height="500"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
