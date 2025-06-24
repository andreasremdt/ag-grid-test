"use client";

import Link from "next/link";
import styles from "./navigation.module.css";
import { useAppContext } from "@/lib/app-context";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const { customViews, onDeleteCustomView } = useAppContext();
  const router = useRouter();

  const carCustomViews = customViews.filter(
    (customView) => customView.type === "cars"
  );

  return (
    <nav className={styles.navigation}>
      <Link href="/" className={styles.link}>
        Home
      </Link>

      <h2 className={styles.heading}>Cars</h2>

      <ul className={styles.list}>
        {carCustomViews.map((customView) => (
          <li className={styles.link} key={customView.id}>
            <Link href={`/views/${customView.id}`}>{customView.title}</Link>

            <button
              type="button"
              onClick={() => {
                onDeleteCustomView(customView);
                router.push("/");
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
