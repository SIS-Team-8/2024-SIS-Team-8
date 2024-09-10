import styles from "./pages.module.css"

export function OnboardingOverview() {
    return (
        <div className={styles.main}>
            <h1>Emotelog Overview</h1>
            <p>Overview of Emotelog goes here</p>
            <button className={styles.onboardingButton}>Go to login page</button>
        </div>
    )
}