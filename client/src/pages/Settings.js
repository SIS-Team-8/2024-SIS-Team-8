import styles from "./pages.module.css"

export default function Settings() {
    return (
        <body>
            <div className={styles.container}>
                <h1>Settings Screen</h1>
                <div className={styles.column}>
                    <p>Frequency of Reminders</p>
                    <p>Theme Options</p>
                    <p>Language Preferences</p>
                    <p>Privacy Settings</p>
                </div>
            </div>
        </body>
    );
  }
