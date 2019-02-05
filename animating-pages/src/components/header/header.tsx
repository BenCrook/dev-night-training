import React from 'react'
import styles from './header.module.css'

const Header = () => (
    <div className={styles.container}>
        <nav>
            <div className={styles.link}>Link 01</div>
            <div className={styles.link}>Link 02</div>
            <div className={styles.link}>Link 03</div>
            <div className={styles.link}>Epicurrence</div>
            <div className={styles.link}>Link 04</div>
            <div className={styles.link}>Link 05</div>
            <div className={styles.link}>Link 06</div>
            <div className={styles.link}>Sign Up</div>
        </nav>
    </div>
);

export default Header
