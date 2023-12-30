import styles from "@/styles/Welcome.module.css";

export default function About() {
  return (
    <main className={styles.welcomeMain}>
      <h1 className={styles.welcomeTitle}>Welcome to GFCC!</h1>
      <div className={styles.mainContent}>
        <div className={styles.textContainer}>
          <p>
            Cristiano Ronaldo dos Santos Aveiro GOIH ComM là một cầu thủ bóng đá
            chuyên nghiệp người Bồ Đào Nha hiện đang thi đấu ở vị trí tiền đạo
            và là đội trưởng của câu lạc bộ Saudi Pro League Al Nassr và đội
            tuyển bóng đá quốc gia Bồ Đào Nha.
          </p>
          <p>
            Messi đã chuyển đến Tây Ban Nha từ Argentina khi mới 13 tuổi để gia
            nhập Barcelona, anh có trận ra mắt chính thức cho đội bóng xứ
            Catalan ở tuổi 17 vào tháng 10 năm 2004. Anh dần là cầu thủ chủ chốt
            của câu lạc bộ trong ba năm tiếp theo.
          </p>
        </div>
        <img src="/HappyGFCC.png" alt="GFCC Logo" className={styles.logo}></img>
      </div>
    </main>
  );
}
