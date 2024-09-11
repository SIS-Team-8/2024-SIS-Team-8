import styles from "./pages.module.css"

export function SignUp() {
    return (
        <div className={styles.container}>
            <img src={logo} alt="App Logo" className={styles.logoStyle} />
            <form>
                <input className={styles.emailBox} placeholder='Email'></input>
                <p></p>
                <input className={styles.userBox} placeholder='Username'></input>
                <p></p>
                <input className={styles.passBox} placeholder='Password' type="password"></input>
                <p></p>
                <input className={styles.passBox} placeholder='Confirm Password' type="password"></input>
            </form>
            <button>Create Account</button>
            <p className={styles.bottom}><a>Login</a></p>
        </div>
    )
}