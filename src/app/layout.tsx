import Navigation from "@/components/navigation/navigation";
import AppContextProvider from "./app-context-provider";
import "./globals.css";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <div className={styles.container}>
            <Navigation />

            <main className={styles.main}>{children}</main>
          </div>
        </AppContextProvider>
      </body>
    </html>
  );
}
