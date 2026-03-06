import React, {useState} from 'react'
import styles from './Login.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // replace with your auth logic
    console.log({email, password, remember})
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <main className={styles.cardWrap}>
        <form className={styles.card} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Login</h2>

          <label className={styles.label} htmlFor="email">Enter your email</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            required
          />

          <label className={styles.label} htmlFor="password">Enter your password</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <div className={styles.row}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <span>Remember me</span>
            </label>

            <a className={styles.forgot} href="#">Forgot password?</a>
          </div>

          <button type="submit" className={styles.submit}>Log In</button>

          <p className={styles.footer}>Don't have an account? <a href="#" className={styles.link}>Register</a></p>
        </form>
      </main>
    </div>
  )
}

export default Login
