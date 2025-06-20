"use client";

import Link from "next/link";
import styles from "./navigation.module.css";
import { useAppContext } from "@/lib/app-context";

export default function Navigation() {
  const { customViews } = useAppContext();

  const carCustomViews = customViews.filter(
    (customView) => customView.type === "cars"
  );
  const computerCustomViews = customViews.filter(
    (customView) => customView.type === "computers"
  );

  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>

        <li className={styles.separator} role="separator">
          Cars
        </li>
        {carCustomViews.map((customView) => (
          <li className={styles.link} key={customView.id}>
            <Link href={`/views/${customView.id}`}>{customView.title}</Link>
          </li>
        ))}

        <li className={styles.separator} role="separator">
          Computers
        </li>
        {computerCustomViews.map((customView) => (
          <li className={styles.link} key={customView.id}>
            <Link href={`/views/${customView.id}`}>{customView.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
