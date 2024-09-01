import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loading}>
      <span className={styles.ico_loading}></span>
      <span className={styles.ico_loading}></span>
      <span className={styles.ico_loading}></span>
    </div>
  )
}

export default Loading;