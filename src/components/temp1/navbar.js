import Link from 'next/link';
import styles from  './styles/navbar.module.css'; // ✅ Use `styles` import for CSS Modules

export default function Navbar() {
    return (
        
        <nav className={styles.navbar}>
            
            <Link className={styles.navLink} href="/">Home</Link>
            <Link className={styles.navLink} href="/about">About</Link>
            <Link className={styles.navLink} href="/services">Services</Link>
            <Link className={styles.navLink} href="/contact">Contact</Link>
        </nav>
    );
}

