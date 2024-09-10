import styles from "./pages.module.css"

export function Login() {
    return (
        <body>
        <div className={styles.main}>
                <h1>Log in</h1>
                <p>Username <input></input></p>
                <p className={styles.passLine}>Password <input type="password"></input></p>
                <button>Login</button>
            </div>
            <div className={styles.bottom}>
            <p><a>Sign Up</a> | <a>Alternate Sign Up</a></p>
          </div>
        </body>
    );
}