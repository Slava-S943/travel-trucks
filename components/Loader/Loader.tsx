import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.backdrop}>
      <div className={styles.loader}>
        <div className={styles.spinner} />

        <h2 className={styles.title}>Loading Tracks...</h2>

        <p className={styles.text}>
          Please wait while we fetch the best
          <br />
          travel trucks for you
        </p>
      </div>
    </div>
  );
}
