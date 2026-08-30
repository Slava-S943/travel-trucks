"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isCatalogActive = pathname.startsWith("/catalog");

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="TravelTrucks home">
          <Image src="/logo.svg" alt="TravelTrucks" width={136} height={16} />
        </Link>

        <nav className={styles.navigation} aria-label="Main navigation">
          <Link
            href="/"
            className={`${styles.link} ${isHomeActive ? styles.active : ""}`}
          >
            Home
          </Link>

          <Link
            href="/catalog"
            className={`${styles.link} ${isCatalogActive ? styles.active : ""}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
