import styles from "./pages.module.css"

export function SignUp() {
    return (
        <div className={styles.main}>
            <h1>Sign Up</h1>
              <p>Username <input></input></p>
              <p className={styles.passLine}>Password <input type="password"></input></p>
              <p className={styles.conPassLine}>Confirm Password <input type="password"></input></p>
            <button>Create Account</button>
        </div>
    )
}