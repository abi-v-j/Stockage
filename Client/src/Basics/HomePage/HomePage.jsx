import React from 'react'
import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.pre}>Dilocash</div>
          <h1 className={styles.title}>
            Fast And Simple
            <br />
            Digital Payment
            <br />
            Solution
          </h1>
          <p className={styles.subtitle}>
            Many credit cards are lost by the users, stolen, or expired. But,
            these cards can still be used by others. This app can provide you
            with a card and necessary information. They also offer burner
            credit cards (single-use virtual cards).
          </p>

          <div className={styles.cta}>
            <button className={styles.primary}>Get It Now</button>
            <button className={styles.secondary}>Download App</button>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.badge}>01</div>
              <div>
                <h4>Financial Transaction</h4>
                <p>Manage everything from the letter app or website</p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.badge}>02</div>
              <div>
                <h4>Easy To Use System</h4>
                <p>Each card can have its very unique card holder name balance</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.cardWrap}>
            {/* Place a hero image at public/hero-cards.png or replace src with your asset */}
            <img src="/hero-cards.png" alt="cards" className={styles.cardImg} />

            <div className={styles.pulse} />

            <div className={styles.stats}>
              <div className={styles.statNumber}>1.24M</div>
              <div className={styles.statLabel}>World Active User</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage