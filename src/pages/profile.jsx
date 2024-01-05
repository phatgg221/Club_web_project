import styles from "@/styles/Profile.module.css";
import { useState } from "react";

export default function Profile() {
    const [changePw, setChangePw] = useState(false);

    function logout() {
        document.location = "/";
    }

    return <div className={styles.container}>
        <img className={styles.img} src="/HappyGFCC.png" />
        <p className={styles.p}>Username: <span>Silver Flame</span></p>
        <p className={styles.p}>Major: <span>Business Management</span></p>
        <button
            className={styles.button}
            onClick={() => setChangePw(true)}>
            Update your password
        </button>

        {changePw && (
            <>
                <form>
                    <input className={styles.inputPass} type="text" placeholder="Enter current password" />
                </form>
                <form>
                    <input className={styles.inputPass} type="text" placeholder="Enter new password" />
                    <button className={styles.submit}>Submit</button>
                </form>
            </>

        )}

        <button className={styles.logout}
            onClick={() => logout()}
        >Logout</button>
    </div >;
}