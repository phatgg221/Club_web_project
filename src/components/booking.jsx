import styles from"@/styles/Booking.module.css"

export default function Booking(){
    return(
        <div className={styles.mainContent}>
            <h1>Book a Session</h1>
            <p>Leave your information here and we will reach out to you ASAP.</p>
            <div className={styles.box}></div>
        </div>
    )
}