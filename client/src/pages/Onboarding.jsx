import styles from "./pages.module.css"

export function Onboarding() {
    return (
        <div className={styles.main}>
            <h1>Welcome to EmoteLog!</h1>
            <p>"Emoji's can tell a thousand words"</p>
            <p><button className={styles.onboardingButton}>Skip Introduction</button> <button className={styles.onboardingButton}>Continue with Introduction</button></p>
        </div>
    )
}