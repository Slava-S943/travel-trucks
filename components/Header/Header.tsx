import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          TravelTrucks
        </Link>

        <nav className={styles.navigation} aria-label="Main navigation">
          <Link href="/" className={styles.link}>
            Home
          </Link>

          <Link href="/catalog" className={styles.link}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
