import styles from "./pages.module.css";

export default function Settings() {
    return (
        <div className={styles.container}>
            <h1>Settings Screen</h1>
            <div className={styles.columns}>
                {/* Column for text items */}
                <div className={styles.column}>
                    <p>Frequency of Reminders</p>
                    <p>Theme Options</p>
                    <p>Language Preferences</p>
                    <p>Privacy Settings</p>
                </div>

                {/* Column for checkbox items */}
                <div className={styles.column}>
                    <form>
                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="daily" value="Daily" />
                            <label htmlFor="daily">Daily</label>
                        </div>
                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="weekly" value="Weekly" />
                            <label htmlFor="weekly">Weekly</label>
                        </div>
                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="monthly" value="Monthly" />
                            <label htmlFor="monthly">Monthly</label>
                        </div>
                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="custom" value="Custom" />
                            <label htmlFor="custom">Custom</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
